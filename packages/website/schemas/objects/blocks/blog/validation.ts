import { z } from "zod";
import { linkValidation } from "../link/validation";
import { seoListBlockValidation } from "../seo/seoValidation";

export const blogBlockValidation = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
    _type: z.string(),
  }),
  subTitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  body: z.any(),
  image: z
    .object({
      url: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  cta: linkValidation,
  _createdAt: z.string(),
  _updatedAt: z.string(),
  seo: seoListBlockValidation.optional().nullable(),
});
