import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { z } from "zod";

export const pageSchema = z.object({
  whySurewill: z.object({
    content: blocksValidation.contentBlockValidation,
    whyList: blocksValidation.listBlockValidation,
    bulletList: z.array(blocksValidation.bulletCardBlockValidation),
  }),
  itNotABigJob: z.object({
    content: blocksValidation.contentBlockValidation,
    checkList: blocksValidation.listBlockValidation,
    heroImage: z.object({
      imageUrl: z.string().nullable().optional(),
      alt: z.string().nullable().optional(),
    }),
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
