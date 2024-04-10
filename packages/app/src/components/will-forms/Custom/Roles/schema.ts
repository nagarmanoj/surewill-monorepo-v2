import { z } from "zod";
import { addressSchema, superRefineAddress } from "~/utils/addresses";

export const formSchema = z
  .object({
    hasChildren: z.boolean().nullable().default(false),
    hasPets: z.boolean().nullable().default(false),
    inheritanceAge: z.string(),
    cremated: z.enum(["cremated", "buried", "undecided"]),
    donateOrgans: z.enum(["yes", "no"]),
    guardian: z
      .object({
        fullName: z.string(),
        address: addressSchema,
      })
      .nullable()
      .optional(),
    backupGuardian: z
      .object({
        fullName: z.string(),
        address: addressSchema,
      })
      .nullable()
      .optional(),
    pets: z.array(
      z.object({
        name: z.string(),
        type: z.string(),
        ownerFullName: z.string(),
        ownerAddress: addressSchema,
      })
    ),
  })
  .superRefine((values, context) => {
    if (values.hasChildren) {
      if (!values.guardian?.fullName) {
        context.addIssue({
          message: "Please enter a name",
          code: z.ZodIssueCode.custom,
          path: ["guardian.fullName"],
        });
      }
      superRefineAddress({
        address: values?.guardian?.address,
        context,
        path: "guardian.address",
      });
      if (!values.backupGuardian?.fullName) {
        context.addIssue({
          message: "Please enter a name",
          code: z.ZodIssueCode.custom,
          path: ["backupGuardian.fullName"],
        });
      }
      superRefineAddress({
        address: values?.backupGuardian?.address,
        context,
        path: "backupGuardian.address",
      });
      if (!values.inheritanceAge) {
        context.addIssue({
          message: "Please select an age",
          code: z.ZodIssueCode.custom,
          path: ["inheritanceAge"],
        });
      }
    }
    if (values.hasPets) {
      return values.pets.map((pet, index) => {
        if (!pet.name) {
          context.addIssue({
            message: "Please enter your pet's name",
            code: z.ZodIssueCode.custom,
            path: [`pets.${index}.name`],
          });
        }
        if (!pet.type) {
          context.addIssue({
            message: "Please select the type of pet",
            code: z.ZodIssueCode.custom,
            path: [`pets.${index}.type`],
          });
        }
        if (!pet.ownerFullName) {
          context.addIssue({
            message: "Please enter a name",
            code: z.ZodIssueCode.custom,
            path: [`pets.${index}.ownerFullName`],
          });
        }
        superRefineAddress({
          address: pet.ownerAddress,
          context,
          path: `pets.${index}.ownerAddress`,
        });
      });
    }
  });

export type FieldValues = z.infer<typeof formSchema>;
