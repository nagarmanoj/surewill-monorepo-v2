import { z } from "zod";

export const TestimonialBlockValidation = z.object({
  name: z.string(),
  detail: z.string(),
});


