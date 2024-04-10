import { CouponType, Prisma, WillStatus } from "@prisma/client";
import { db } from "~/libs/prisma";

export const createBillingAndUpdateWill = async ({
  willId,
  productId,
  createBillingData,
  coupleCouponGenerated,
}: {
  willId: string;
  productId: string;
  createBillingData: Prisma.BillingCreateArgs["data"];
  coupleCouponGenerated: string | undefined;
}) => {
  let finalCreateBillingData = createBillingData;
  if (coupleCouponGenerated) {
    finalCreateBillingData = {
      ...finalCreateBillingData,
      coupons: {
        create: {
          couponCode: coupleCouponGenerated,
          type: CouponType.COUPLE,
        },
      },
    };
  }
  const createOrUpdateBilling = db.billing.upsert({
    where: {
      willId,
    },
    create: finalCreateBillingData,
    update: {
      paidAt: new Date(),
      stripeProductId: productId,
    },
  });
  const updateWill = db.will.update({
    where: {
      id: willId,
    },
    data: {
      status: WillStatus.COMPLETE_PAID,
    },
  });
  return db.$transaction([createOrUpdateBilling, updateWill]);
};

export type StipeWebhookPayloadMeta = {
  willId?: string;
  productId?: string;
  coupleCouponGenerated?: string;
};
