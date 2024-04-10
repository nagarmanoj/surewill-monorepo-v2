import { z } from "zod";
import { linkValidation } from "../link/validation";

export const contentBlockValidation = z.object({
  title: z.string().optional().nullable(),
  subTitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  cta: linkValidation
});