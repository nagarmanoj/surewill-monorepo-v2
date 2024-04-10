import { Prisma } from "@prisma/client";
import Stripe from "stripe";
import { createBillingAndUpdateWill } from "../utils";

export const invoiceSuccessHandler = ({
  willId,
  productId,
  subscription,
  coupleCouponGenerated,
}: {
  willId: string;
  productId: string;
  subscription: Stripe.Subscription;
  coupleCouponGenerated?: string;
}) => {
  let createBillingData: Prisma.BillingCreateArgs["data"] = {
    willId,
    paidAt: new Date(),
    stripeProductId: productId,
    stripeCustomerId:
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id || "",
    stripeSubscriptionId: subscription.id,
    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
  };
  return createBillingAndUpdateWill({
    willId,
    productId,
    createBillingData,
    coupleCouponGenerated,
  });
};
