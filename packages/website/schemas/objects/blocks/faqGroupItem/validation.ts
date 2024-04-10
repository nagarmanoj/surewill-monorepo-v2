import { z } from "zod";
import { faqBlockValidation } from "../faq/validation";

export const faqGroupItemBlockValidation = z.object({
  id: z.string().optional().nullable(),
  faqGroupName: z.string().optional(),
  faqList: z.array(faqBlockValidation).nullable().optional(),
});
