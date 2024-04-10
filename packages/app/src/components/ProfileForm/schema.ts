import { z } from "zod";
import { requiredAddressSchema } from "~/utils/addresses";
import { isOver18OrOver } from "./utils";

export const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "Please enter your first name",
  }),
  middleName: z.string(),
  lastName: z.string().min(1, {
    message: "Please enter your last name",
  }),
  dateOfBirth: z
    .string()
    .length(10, {
      message: "Please enter your date of birth",
    })
    .refine((value) => isOver18OrOver(value), {
      message:
        "We are sorry, but as you are under 18 years of age, you are not old enough to make a binding Australian will.",
    }),
  address: requiredAddressSchema,
  willCreationType: z.string(),
});

export type FieldValues = z.infer<typeof formSchema>;
