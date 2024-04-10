import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import addMonths from "date-fns/addMonths";
import { z } from "zod";
import { withAuth, RequestWithAuth } from "~/libs/auth";
import { db } from "~/libs/prisma";
import { stripe } from "~/libs/stripe-server";
import { toStripeAddress } from "~/utils/addresses";
import { getTotalUnitAmountWithCoupon } from "~/utils/coupons";
import type { StipeWebhookPayloadMeta } from "~/app/api/webhooks/stripe/utils";
import { env } from "@/env.mjs";
import { schema } from "./types";

const postHandler = async (request: RequestWithAuth) => {
  try {
    const json = await request.json();
    const {
      willId,
      priceId,
      productId,
      coupleCouponGenerated,
      coupleCouponApplied,
    } = schema.parse(json);

    const user = await currentUser();
    const emailAddress = user?.emailAddresses[0]?.emailAddress;

    const dbPromises: Array<Promise<any>> = [
      db.will.findFirst({
        where: {
          id: willId,
        },
        select: {
          address: true,
        },
      }),
    ];

    if (coupleCouponApplied) {
      dbPromises.push(
        db.coupon.update({
          where: {
            id: coupleCouponApplied,
          },
          data: {
            appliedAt: new Date(),
            appliedToWillId: willId,
          },
        })
      );
    }

    const [will] = await Promise.all(dbPromises);

    const [paymentAmount, customer] = await Promise.all([
      stripe.prices.retrieve(priceId),
      stripe.customers.create({
        email: emailAddress,
        address: will?.address ? toStripeAddress(will.address) : {},
        metadata: {
          userId: request.user.id,
        },
      }),
    ]);

    let subscriptionMeta: StipeWebhookPayloadMeta = {
      willId,
      productId,
    };
    if (coupleCouponGenerated) {
      subscriptionMeta = {
        ...subscriptionMeta,
        coupleCouponGenerated,
      };
    }

    // If a coupon is applied, we manually reduce the price.
    // Stripe does not support applying coupons to payment_intents (nor subscriptions with invoice items)
    // https://support.stripe.com/questions/support-for-coupons-using-payment-intents-api
    const addInvoiceItems = coupleCouponApplied
      ? [
          {
            price_data: {
              currency: "aud",
              product: productId,
              unit_amount: getTotalUnitAmountWithCoupon(
                paymentAmount.unit_amount as number,
                true
              ),
            },
          },
        ]
      : [{ price: priceId }];

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: env.STRIPE_SUBSCRIPTION_PRICE_ID }],
      trial_end: Math.round(addMonths(new Date(), 1).valueOf() / 1000),
      add_invoice_items: addInvoiceItems,
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent", "pending_setup_intent"],
      metadata: subscriptionMeta,
    });

    return NextResponse.json(
      {
        subscriptionId: subscription.id,
        clientSecret:
          // @ts-ignore
          subscription?.latest_invoice?.payment_intent?.client_secret,
        paymentSetupClientSecret:
          // @ts-ignore
          subscription?.pending_setup_intent?.client_secret, // if the invoice item has price of zero, we'll get a setupIntent instead of paymentIntent
        coupleCouponGenerated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: JSON.stringify(error.issues),
        },
        {
          status: 422,
        }
      );
    }

    return NextResponse.json(error?.message, {
      status: 400,
    });
  }
};

export const POST = withAuth(postHandler);
