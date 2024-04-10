import { z } from "zod";

export const seoProductBlockValidation = z.object({
  _type: z.literal("productSeoBlock"),
  productName: z.string(),
  description: z.string(),
  brand: z.string().optional().nullable(),
  image: z
    .array(
      z.object({
        url: z.string(),
      })
    )
    .optional()
    .nullable(),
  offers: z
    .object({
      price: z.string(),
      priceCurrency: z.string(),
      availability: z.string(),
      seller: z
        .object({
          name: z.string().optional().nullable(),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable(),
  reviews: z
    .array(
      z.object({
        author: z.string(),
        name: z.string(),
        reviewBody: z.string(),
        datePublished: z.string(),
        reviewRating: z.object({
          bestRating: z.number(),
          ratingValue: z.number(),
          worstRating: z.number(),
        }),
        publisher: z.object({
          name: z.string(),
          type: z.string(),
        }),
      })
    )
    .nullable()
    .optional(),
  aggregateRating: z
    .object({
      ratingValue: z.number(),
      reviewCount: z.number(),
    })
    .nullable()
    .optional(),
});
