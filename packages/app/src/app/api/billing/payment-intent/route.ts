import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs";
import { withAuth, RequestWithAuth } from "~/libs/auth";
import { toStripeAddress } from "~/utils/addresses";
import { getTotalUnitAmountWithCoupon } from "~/utils/coupons";
import { stripe } from "~/libs/stripe-server";
import { db } from "~/libs/prisma";
import type { StipeWebhookPayloadMeta } from "~/app/api/webhooks/stripe/utils";
import { schema } from "./types";

const postHandler = async (request: RequestWithAuth) => {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const userEmailAddress = user.emailAddresses[0]?.emailAddress;
    if (!userEmailAddress) {
      return new Response("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const {
      willId,
      priceId,
      productId,
      coupleCouponGenerated,
      coupleCouponApplied,
    } = schema.parse(json);

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
        email: userEmailAddress,
        address: will?.address ? toStripeAddress(will.address) : undefined,
        metadata: {
          userId: request.user.id,
        },
      }),
    ]);

    let paymentIntentMeta: StipeWebhookPayloadMeta = {
      willId,
      productId,
    };
    if (coupleCouponGenerated) {
      paymentIntentMeta = {
        ...paymentIntentMeta,
        coupleCouponGenerated,
      };
    }

    // If a coupon is applied, we manually reduce the price.
    // Stripe does not support applying coupons to payment_intents
    // https://support.stripe.com/questions/support-for-coupons-using-payment-intents-api
    const paymentIntent = await stripe.paymentIntents.create({
      amount: getTotalUnitAmountWithCoupon(
        paymentAmount.unit_amount as number,
        !!coupleCouponApplied
      ),
      currency: "aud",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: paymentIntentMeta,
    });

    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        customerId: customer.id,
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
          error: error.issues,
        },
        {
          status: 422,
        }
      );
    }

    return NextResponse.json(error, {
      status: 400,
    });
  }
};

export const POST = withAuth(postHandler);
