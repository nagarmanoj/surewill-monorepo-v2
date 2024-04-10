import { z } from "zod";
import { LinkEnum, buttonVaraintEnum } from "./enum";

export const linkValidation = z
  .object({
    title: z.string().optional().nullable(),
    href: z.string().optional().nullable(),
    target: z.enum(LinkEnum).optional().nullable(),
    buttonVaraint: z.enum(buttonVaraintEnum).optional().nullable(),
    id: z.string().optional().nullable(),
  })
  .optional()
  .nullable();
