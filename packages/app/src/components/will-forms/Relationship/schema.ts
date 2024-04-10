import { z } from "zod";
import { isValidEmail } from "~/libs/validation";
import {
  addressSchema,
  requiredAddressSchema,
  superRefineAddress,
} from "~/utils/addresses";

export const formSchema = z
  .object({
    cremated: z.enum(["cremated", "buried", "undecided"]),
    professionalAsExecutor: z.boolean(),
    professionalAsBackupExecutor: z.boolean(),
    siblingsAfterPartner: z.boolean(),
    partnerAsExecutor: z.boolean(),
    partner: z.object({
      fullName: z.string().min(1, {
        message: "Please enter your partner's name",
      }),
      address: requiredAddressSchema,
    }),
    executor: z.object({
      fullName: z.string(),
      email: z.string(),
      address: addressSchema,
    }),
    backupExecutor: z
      .object({
        fullName: z.string(),
        email: z.string(),
        address: addressSchema,
      })
      .nullable(),
    pets: z.array(
      z.object({
        name: z.string().min(1, {
          message: "Please enter your pet's name",
        }),
        type: z.string().min(1, {
          message: "Please enter the type of pet",
        }),
        ownerFullName: z.string().min(1, {
          message: "Please enter the owner's full name",
        }),
        ownerAddress: requiredAddressSchema,
        isOwnerPartner: z.boolean(),
      })
    ),
  })
  .superRefine((values, context) => {
    // Conditional validation - makes the executor details required if not using a professional executor
    if (!values.professionalAsExecutor) {
      if (!values.executor.fullName) {
        context.addIssue({
          message: "Please enter a name",
          code: z.ZodIssueCode.custom,
          path: ["executor.fullName"],
        });
      }
      superRefineAddress({
        address: values.executor.address,
        context,
        path: "executor.address",
      });
      if (!values.executor.email) {
        context.addIssue({
          message: "Please enter an email address",
          code: z.ZodIssueCode.custom,
          path: ["executor.email"],
        });
      }
      if (values.executor.email && !isValidEmail(values.executor.email)) {
        context.addIssue({
          message: "Email address is not valid",
          code: z.ZodIssueCode.custom,
          path: ["executor.email"],
        });
      }
    }
    // Conditional validation - makes the backup executor details required if using partner as executor
    if (values.partnerAsExecutor && !values.professionalAsBackupExecutor) {
      if (!values?.backupExecutor?.fullName) {
        context.addIssue({
          message: "Please enter a name",
          code: z.ZodIssueCode.custom,
          path: ["backupExecutor.fullName"],
        });
      }
      superRefineAddress({
        address: values.backupExecutor?.address,
        context,
        path: "backupExecutor.address",
      });
      if (!values?.backupExecutor?.email) {
        context.addIssue({
          message: "Please enter an email address",
          code: z.ZodIssueCode.custom,
          path: ["backupExecutor.email"],
        });
      }
      if (
        values?.backupExecutor?.email &&
        !isValidEmail(values.backupExecutor.email)
      ) {
        context.addIssue({
          message: "Email address is not valid",
          code: z.ZodIssueCode.custom,
          path: ["executor.email"],
        });
      }
    }
  });

export type FieldValues = z.infer<typeof formSchema>;
