import { z } from "zod";

export const seoBasicBlockValidation = z.object({
  _type: z.literal("seoBlock"),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  image: z
    .object({
      url: z.string(),
      alt: z.string().optional().nullable(),
      size: z.number(),
      type: z.string(),
    })
    .nullable()
    .optional(),
});
