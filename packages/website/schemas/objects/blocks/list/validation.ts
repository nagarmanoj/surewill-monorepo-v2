import { z } from "zod";

import { linkValidation } from "../link/validation";

export const listBlockValidation = z.object({
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  list: z
    .array(
      z.object({
        icon: z
          .object({
            imageUrl: z.string().optional().nullable(),
            alt: z.string().optional().nullable(),
            url: z.string().optional().nullable(),
          })
          .optional(),
        listText: z.string().optional().nullable(),
        href: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
  cta: linkValidation,
});
