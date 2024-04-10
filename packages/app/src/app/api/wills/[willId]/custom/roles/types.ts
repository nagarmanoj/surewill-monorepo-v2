import { z } from "zod";
import { addressSchema } from "~/utils/addresses";

const guardianSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
});

const petSchema = z.object({
  name: z.string(),
  type: z.string(),
  ownerFullName: z.string(),
  ownerAddress: addressSchema,
  isOwnerPartner: z.boolean(),
});

export const updateWillSchema = z.object({
  guardian: guardianSchema.optional(),
  backupGuardian: guardianSchema.optional(),
  pets: z.array(petSchema),
  cremated: z.boolean().nullable(),
  inheritanceAge: z.number().optional(),
  donateOrgans: z.boolean(),
});

export type UpdateWillInput = z.infer<typeof updateWillSchema>;

export type ResponseBody = {
  success: boolean;
};
