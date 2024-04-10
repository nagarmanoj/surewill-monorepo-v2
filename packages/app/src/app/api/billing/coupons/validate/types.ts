import { CouponType } from "@prisma/client";
import { z } from "zod";

export const schema = z.object({
  coupon: z.string().min(1).trim(),
});

export type ValidateCouponInput = z.infer<typeof schema>;

export type ValidateCouponResponseBody = {
  valid: boolean;
  couponCode: string;
  couponId: string;
  type: CouponType;
};
