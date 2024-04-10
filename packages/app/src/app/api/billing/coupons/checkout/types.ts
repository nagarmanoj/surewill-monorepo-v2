import { z } from "zod";

export const schema = z.object({
  willId: z.string().min(1),
  coupleCouponIdApplied: z.string().min(1),
});

export type CouponCheckoutInput = z.infer<typeof schema>;

export type CouponCheckoutResponseBody = {};
