import { z } from "zod";
import {
  seoBasicBlockValidation,
  seoListBlockValidation,
} from "../seo/seoValidation";

export const pageBlockValidation = z.object({
  title: z.string(),
  subTitle: z.string().optional().nullable(),
  cover: z
    .object({
      url: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  body: z.any(),
  seo: seoListBlockValidation,
});
