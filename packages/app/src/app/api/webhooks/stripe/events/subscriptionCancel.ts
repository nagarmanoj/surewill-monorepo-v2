import { db } from "~/libs/prisma";

export const subscriptionCancelHandler = (willId: string) => {
  return db.billing.update({
    where: {
      willId,
    },
    data: {
      stripeSubscriptionId: null,
      stripeCurrentPeriodEnd: null,
    },
  });
};
