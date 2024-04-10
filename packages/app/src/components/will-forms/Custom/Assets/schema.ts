import { z } from "zod";
import { addressSchema, superRefineAddress } from "~/utils/addresses";

const financialBeneficiarySchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  moneyReceived: z.string().optional(),
  charityName: z.string(),
});

const petCareMoneySchema = z.object({
  petId: z.string(),
  petName: z.string(),
  ownerName: z.string(),
  careMoneyAmount: z.string(),
});

const specialItemSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  itemDescription: z.string(),
});

const residualEstateBeneficiarySchema = z.object({
  fullName: z.string().min(1, {
    message: "Please enter a name",
  }),
  address: addressSchema,
  percentageAssets: z.string(),
  isChildren: z.boolean(),
});

export const formSchema = z
  .object({
    financialBeneficiaries: z.array(financialBeneficiarySchema),
    petCare: z.array(petCareMoneySchema),
    specialItems: z.array(specialItemSchema),
    residualEstateBeneficiaries: z.array(residualEstateBeneficiarySchema),
    childrenResidualEstatePercentage: z.number().optional(),
    passResidualEstateToChildren: z.boolean().default(false),
    passResidualEstateToSiblings: z.boolean().default(false),
  })
  .superRefine((values, context) => {
    if (values.residualEstateBeneficiaries.length) {
      values.residualEstateBeneficiaries.forEach((beneficiary, index) => {
        if (!beneficiary.isChildren) {
          superRefineAddress({
            address: values.residualEstateBeneficiaries[index].address,
            context,
            path: `residualEstateBeneficiaries.${index}.address`,
          });
        }
      });
    }

    if (values.financialBeneficiaries.length > 0) {
      values.financialBeneficiaries.forEach((beneficiary, index) => {
        const fieldHasValues = Boolean(
          beneficiary.fullName ||
            beneficiary.charityName ||
            beneficiary.moneyReceived
        );
        if (fieldHasValues) {
          if (!beneficiary.charityName) {
            if (!beneficiary.fullName) {
              context.addIssue({
                message: "Please enter a name",
                code: z.ZodIssueCode.custom,
                path: [`financialBeneficiaries.${index}.fullName`],
              });
            }
            superRefineAddress({
              address: values.financialBeneficiaries[index].address,
              context,
              path: `financialBeneficiaries.${index}.address`,
            });
          }
          if (!beneficiary.moneyReceived || beneficiary.moneyReceived === "0") {
            context.addIssue({
              message: "Please enter an amount",
              code: z.ZodIssueCode.custom,
              path: [`financialBeneficiaries.${index}.moneyReceived`],
            });
          }
        }
      });
    }

    if (values.specialItems.length) {
      values.specialItems.forEach((personWithItem, index) => {
        const fieldHasValues = Boolean(
          personWithItem.fullName || personWithItem.itemDescription
        );

        if (fieldHasValues) {
          if (!personWithItem.fullName) {
            context.addIssue({
              message: "Please enter a name",
              code: z.ZodIssueCode.custom,
              path: [`specialItems.${index}.fullName`],
            });
          }
          if (!personWithItem.itemDescription) {
            context.addIssue({
              message: "Please enter a description",
              code: z.ZodIssueCode.custom,
              path: [`specialItems.${index}.itemDescription`],
            });
          }
          superRefineAddress({
            address: personWithItem.address,
            context,
            path: `specialItems.${index}.address`,
          });
        }
      });
    }
  });

export type FieldValues = z.infer<typeof formSchema>;
