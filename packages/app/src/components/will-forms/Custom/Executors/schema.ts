import { z } from "zod";
import { addressSchema, superRefineAddress } from "~/utils/addresses";

const executorSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  email: z.string(),
});

export const formSchema = z
  .object({
    executor: executorSchema.nullable(),
    backupExecutor: executorSchema.nullable(),
    professionalAsExecutor: z.boolean(),
    professionalAsBackupExecutor: z.boolean(),
  })
  .superRefine((values, context) => {
    if (!values.professionalAsExecutor) {
      if (!values.executor?.fullName) {
        context.addIssue({
          message: "Please enter a name",
          code: z.ZodIssueCode.custom,
          path: ["executor.fullName"],
        });
      }
      superRefineAddress({
        address: values?.executor?.address,
        context,
        path: "executor.address",
      });
      if (!values.executor?.email) {
        context.addIssue({
          message: "Please enter an email",
          code: z.ZodIssueCode.custom,
          path: ["executor.email"],
        });
      }
    }
    if (!values.professionalAsBackupExecutor) {
      if (!values.backupExecutor?.fullName) {
        context.addIssue({
          message: "Please enter a name",
          code: z.ZodIssueCode.custom,
          path: ["backupExecutor.fullName"],
        });
      }
      superRefineAddress({
        address: values?.backupExecutor?.address,
        context,
        path: "backupExecutor.address",
      });
      if (!values.backupExecutor?.email) {
        context.addIssue({
          message: "Please enter an email",
          code: z.ZodIssueCode.custom,
          path: ["backupExecutor.email"],
        });
      }
    }
  });

export type FieldValues = z.infer<typeof formSchema>;
