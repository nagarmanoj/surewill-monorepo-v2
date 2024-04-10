import { z } from "zod";
import { addressSchema } from "~/utils/addresses";

const financialBeneficiarySchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  moneyReceived: z.string(),
  isCharity: z.boolean(),
});

const itemBeneficiariesSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  itemDescription: z.string(),
});

const residualEstateBeneficiarySchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  percentageAssets: z.number(),
});

const petCareMoneySchema = z.object({
  petId: z.string(),
  careMoneyAmount: z.string(),
});

export const updateWillSchema = z
  .object({
    financialBeneficiaries: z.array(financialBeneficiarySchema),
    itemBeneficiaries: z.array(itemBeneficiariesSchema),
    residualEstateBeneficiaries: z.array(residualEstateBeneficiarySchema),
    petCareMoney: z.array(petCareMoneySchema),
    childrenResidualEstatePercentage: z.number(),
    passResidualEstateToChildren: z.boolean(),
    passResidualEstateToSiblings: z.boolean(),
  })
  .superRefine((values, context) => {
    const residualEstatePercentage = values.residualEstateBeneficiaries.reduce(
      (acc, curr) => {
        acc += Number(curr.percentageAssets);
        return acc;
      },
      0
    );
    const residualEstateWithKids =
      residualEstatePercentage + (values.childrenResidualEstatePercentage || 0);
    if (residualEstateWithKids !== 100) {
      context.addIssue({
        message: "Total assets must equal 100%",
        code: z.ZodIssueCode.custom,
        path: ["assets"],
      });
    }
  });

export type UpdateWillInput = z.infer<typeof updateWillSchema>;

export type ResponseBody = {
  success: boolean;
};
