import { z } from "zod";
import { addressSchema } from "~/utils/addresses";

const partnerSchema = z.object({
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

const executorSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  email: z.string(),
});

export const updateWillSchema = z.object({
  isWillPaid: z.boolean(),
  partner: partnerSchema,
  pets: z.array(petSchema),
  cremated: z.boolean().nullable(),
  executor: executorSchema.optional(),
  backupExecutor: executorSchema.optional(),
  siblingsAfterPartner: z.boolean(),
  professionalAsExecutor: z.boolean(),
  professionalAsBackupExecutor: z.boolean(),
  partnerAsExecutor: z.boolean(),
});

export type UpdateWillInput = z.infer<typeof updateWillSchema>;

export type ResponseBody = {
  success: boolean;
};
