import { z } from "zod";

export const schema = z.object({
  willId: z.string().min(1),
  priceId: z.string().min(1),
  productId: z.string().min(1),
  coupleCouponGenerated: z.string().optional(),
  coupleCouponApplied: z.string().optional(),
});

export type CreateSubscriptionInput = z.infer<typeof schema>;

export type CreateSubscriptionResponseBody = {
  clientSecret: string;
  paymentSetupClientSecret?: string;
  customerId: string;
  coupleCouponGenerated: string | undefined;
};
