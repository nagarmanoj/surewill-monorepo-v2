import { z } from "zod";

export const seoLocalBusinessBlockValidation = z.object({
  _type: z.literal("localBusinessSeoBlock"),
  url: z.string().optional().nullable(),
  name: z.string(),
  description: z.string(),
  telephone: z.string().optional().nullable(),
  type: z.string(),
  image: z.array(
    z.object({
      url: z.string(),
    })
  ),
  address: z
    .object({
      streetAddress: z.string().optional().nullable(),
      addressLocality: z.string().optional().nullable(),
      addressRegion: z.string().optional().nullable(),
      postalCode: z.string().optional().nullable(),
      addressCountry: z.string().optional().nullable(),
    })
    .required(),
  geo: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .required(),
  servesCuisine: z.string().optional().nullable(),
  priceRange: z.string().optional().nullable(),
  menu: z.string().optional().nullable(),
  acceptsReservations: z.boolean(),
  openingHoursSpecification: z.array(
    z.object({
      dayOfWeek: z.array(z.string()),
      opens: z.string(),
      closes: z.string(),
    })
  ),
});
