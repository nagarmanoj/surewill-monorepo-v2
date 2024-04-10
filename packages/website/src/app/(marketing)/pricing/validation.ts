import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { z } from "zod";

export const pageSchema = z.object({
  intro: z.object({
    content: blocksValidation.contentBlockValidation,
    paymentList: blocksValidation.listBlockValidation,
    pricingOptions: z.array(blocksValidation.pricingCardBlockValidation),
    storagePlan: z.array(
      z.object({
        title: z.string(),
        parentheses: z.string(),
        subTitle: z.string(),
        description: z.string(),
      })
    ),
  }),
  whatIGet: z.object({
    content: blocksValidation.contentBlockValidation,
    whatInclude: blocksValidation.listBlockValidation,
    heroImage: z.object({
      imageUrl: z.string().nullable().optional(),
      alt: z.string().nullable().optional(),
    }),
  }),
  seo: blocksValidation.seoListBlockValidation,
});

export const testimonialSchema = z.object({
  testimonialList: z.array(blocksValidation.TestimonialBlockValidation),
});
