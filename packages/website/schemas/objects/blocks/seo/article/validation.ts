import { z } from "zod";

export const seoArticleSeoBlockValidation = z.object({
  _type: z.literal("articleSeoBlock"),
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
  authorName: z.string(),
  datePublished: z.string(),
});
