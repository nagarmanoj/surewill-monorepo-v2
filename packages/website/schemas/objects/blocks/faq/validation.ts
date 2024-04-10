import { z } from "zod";

export const faqBlockValidation = z.object({
  question: z.string(),
  answer: z.string(),
});