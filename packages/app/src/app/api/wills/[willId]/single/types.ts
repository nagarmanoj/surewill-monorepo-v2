import { z } from "zod";
import { addressSchema } from "~/utils/addresses";

const assetBeneficiarySchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  percentageAssets: z.number(),
});

const petSchema = z.object({
  name: z.string(),
  type: z.string(),
  ownerFullName: z.string(),
  ownerAddress: addressSchema,
});

const executorSchema = z.object({
  fullName: z.string(),
  address: addressSchema,
  email: z.string(),
});

export const updateWillSchema = z
  .object({
    isWillPaid: z.boolean(),
    assets: z.array(assetBeneficiarySchema),
    pets: z.array(petSchema),
    cremated: z.boolean().nullable(),
    executor: executorSchema.optional(),
    professionalAsExecutor: z.boolean(),
  })
  .superRefine((values, context) => {
    const totalAssetsPercentage = values.assets.reduce((acc, curr) => {
      acc += Number(curr.percentageAssets);
      return acc;
    }, 0);
    if (totalAssetsPercentage !== 100) {
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
