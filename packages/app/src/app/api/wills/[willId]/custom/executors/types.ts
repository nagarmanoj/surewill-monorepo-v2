import { z } from "zod";
import { addressSchema } from "~/utils/addresses";

const executorSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  email: z.string(),
});

export const updateWillSchema = z.object({
  isWillPaid: z.boolean(),
  executor: executorSchema.nullable(),
  backupExecutor: executorSchema.nullable(),
  professionalAsExecutor: z.boolean(),
  professionalAsBackupExecutor: z.boolean(),
});

export type UpdateWillInput = z.infer<typeof updateWillSchema>;

export type ResponseBody = {
  success: boolean;
};
