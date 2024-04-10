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
    executor: z.object({
      fullName: z.string(),
      email: z.string(),
      address: addressSchema,
    }),
    assetBeneficiaries: z.array(
      z.object({
        fullName: z.string().min(1, {
          message: "Please enter a full name",
        }),
        address: requiredAddressSchema,
        percentageAssets: z.string().min(1, {
          message: "Please enter the % of assets",
        }),
      })
    ),
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
      })
    ),
  })
  .superRefine((values, context) => {
    // Conditional validation - makes the executor details required if not using a professional executor
    if (values.professionalAsExecutor === false) {
      if (!values.executor.fullName) {
        context.addIssue({
          message: "Please enter a name",
          code: z.ZodIssueCode.custom,
          path: ["executor.fullName"],
        });
      }
      if (!values.executor.email) {
        context.addIssue({
          message: "Please enter an email address",
          code: z.ZodIssueCode.custom,
          path: ["executor.email"],
        });
      }
      superRefineAddress({
        address: values.executor.address,
        context,
        path: "executor.address",
      });
      if (values.executor.email && !isValidEmail(values.executor.email)) {
        context.addIssue({
          message: "Email address is not valid",
          code: z.ZodIssueCode.custom,
          path: ["executor.email"],
        });
      }
    }
  });

export type FieldValues = z.infer<typeof formSchema>;
