import { z } from "zod";
import { WillCreationType } from "@prisma/client";
import { addressSchema } from "~/utils/addresses";

export const updateProfileSchema = z.object({
  willId: z.string().optional(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  address: addressSchema,
  willCreationType: z.enum(
    Object.values(WillCreationType) as [string, ...string[]]
  ),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export type ResponseBody =
  | {
      success: true;
      data: {};
    }
  | {
      success: false;
      error: string;
    };
