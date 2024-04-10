import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  lastName: z.string().min(1, {
    message: "Please enter your last name",
  }),
  emailAddress: z.string().email().min(1, {
    message: "Please enter your email address",
  }),
  phoneNumber: z.string().optional(),
  password: z.string().min(8, {
    message: "Please choose a password of at least 8 characters",
  }),
});

export type FieldValues = z.infer<typeof formSchema>;
