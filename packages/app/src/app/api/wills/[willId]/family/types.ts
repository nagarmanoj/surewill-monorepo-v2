import { z } from "zod";
import { addressSchema } from "~/utils/addresses";

const partnerSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
});

const guardianSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
});

const backupGuardianSchema = z.object({
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
  guardian: guardianSchema,
  backupGuardian: backupGuardianSchema,
  pets: z.array(petSchema),
  cremated: z.boolean().nullable(),
  executor: executorSchema.optional(),
  backupExecutor: executorSchema.optional(),
  professionalAsExecutor: z.boolean(),
  professionalAsBackupExecutor: z.boolean(),
  partnerAsExecutor: z.boolean(),
  partnerAsGuardian: z.boolean(),
});

export type UpdateWillInput = z.infer<typeof updateWillSchema>;

export type ResponseBody = {
  success: boolean;
};
