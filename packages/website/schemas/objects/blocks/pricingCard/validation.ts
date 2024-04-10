import { z } from "zod";

import { linkValidation } from "../link/validation";

export const pricingCardBlockValidation = z.object({
  title: z.string().optional().nullable(),
  number: z.number().optional().nullable(),
  currency: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  image: z.object({
    url: z.string().optional().nullable(),
    alt: z.string().optional().nullable(),
  }),
  cta: linkValidation
});


