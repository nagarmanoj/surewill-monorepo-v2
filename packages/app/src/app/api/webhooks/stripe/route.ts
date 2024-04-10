import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "~/libs/stripe-server";
import { sendSnsNotification } from "~/libs/sns";
import { WillStatus } from "@prisma/client";
import { db } from "~/libs/prisma";
import { env } from "@/env.mjs";
import { paymentIntentSuccessHandler } from "./events/paymentIntent";
import { invoiceSuccessHandler } from "./events/invoicePayment";
import { subscriptionCancelHandler } from "./events/subscriptionCancel";
import { StipeWebhookPayloadMeta } from "./utils";

interface PaymentIntentWithMetadata extends Stripe.PaymentIntent {
  metadata: StipeWebhookPayloadMeta;
}

interface SubscriptionWithMetadata extends Stripe.PaymentIntent {
  metadata: StipeWebhookPayloadMeta;
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${error?.message}` },
      {
        status: 400,
      }
    );
  }

  try {
    // Handles successful one-off payments
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as PaymentIntentWithMetadata;

      // If the intent also has an invoice, then rely on the "invoice.payment_succeeded" event (this happens for new subscriptions)
      if (paymentIntent.invoice) {
        return new Response(null, { status: 200 });
      }

      const willId = paymentIntent.metadata?.willId;
      const productId = paymentIntent.metadata?.productId;
      if (!willId || !productId) {
        console.warn(
          `Skipping ${event.type} event because missing willId or productId`,
          { willId, productId }
        );
        return;
      }
      await sendSnsNotification(willId);
      await paymentIntentSuccessHandler({
        willId,
        productId,
        customerId:
          typeof paymentIntent.customer === "string"
            ? paymentIntent.customer
            : paymentIntent?.customer?.id || "",
        coupleCouponGenerated: paymentIntent?.metadata?.coupleCouponGenerated,
      });
    }

    // Handles successful subscription payments
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      const lineItemWithMeta = invoice.lines.data.find(
        (lineItem) => !!lineItem.metadata.willId
      );
      const willId = lineItemWithMeta?.metadata?.willId;
      const productId = lineItemWithMeta?.metadata?.productId;
      if (!willId || !productId) {
        console.warn(
          `Skipping ${event.type} event because missing willId or productId`,
          { willId, productId }
        );
        return;
      }
      if (!invoice.subscription) {
        console.warn(
          `Skipping ${event.type} event because missing subscription ID`
        );
        return;
      }

      const will = await db.will.findFirst({
        where: {
          id: willId,
        },
        select: {
          status: true,
        },
      });

      // Only handle if this is the first payment in a subscription
      const isAlreadyPaid = will?.status === WillStatus.COMPLETE_PAID;
      if (isAlreadyPaid) {
        return new Response(null, { status: 200 });
      }

      const stripeSubscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string
      );
      await sendSnsNotification(willId);
      await invoiceSuccessHandler({
        willId,
        productId,
        subscription: stripeSubscription,
        coupleCouponGenerated:
          lineItemWithMeta?.metadata?.coupleCouponGenerated,
      });
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as SubscriptionWithMetadata;
      const willId = subscription.metadata?.willId;
      if (!willId) {
        console.warn(`Skipping ${event.type} event because missing Will ID`);
        return;
      }
      await subscriptionCancelHandler(willId);
    }

    // Handles failed subscription payments
    if (event.type === "invoice.payment_failed") {
      // TODO
    }

    return new Response(null, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${error?.message}` },
      {
        status: 400,
      }
    );
  }
}
