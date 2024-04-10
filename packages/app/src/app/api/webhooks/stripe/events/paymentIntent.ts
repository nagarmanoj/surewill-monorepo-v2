import { Prisma } from "@prisma/client";
import { createBillingAndUpdateWill } from "../utils";

export const paymentIntentSuccessHandler = async ({
  willId,
  productId,
  customerId,
  coupleCouponGenerated,
}: {
  willId: string;
  productId: string;
  customerId: string;
  coupleCouponGenerated?: string;
}) => {
  const createBillingData: Prisma.BillingCreateArgs["data"] = {
    willId,
    paidAt: new Date(),
    stripeProductId: productId,
    stripeCustomerId: customerId,
  };
  return createBillingAndUpdateWill({
    willId,
    productId,
    createBillingData,
    coupleCouponGenerated,
  });
};
