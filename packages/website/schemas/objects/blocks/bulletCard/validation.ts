import { z } from "zod";

import { linkValidation } from "../link/validation";

export const bulletCardBlockValidation = z.object({
  title: z.string().optional().nullable(),
  body: z.any(),
  number: z.number().optional().nullable(),
  image: z.object({
    url: z.string().optional().nullable(),
    alt: z.string().optional().nullable(),
  }),
  cta: linkValidation,
});
