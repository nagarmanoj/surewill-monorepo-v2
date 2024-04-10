import { Address } from "@prisma/client";
import Stripe from "stripe";
import { RefinementCtx, z } from "zod";

export const addressSchema = z.object({
  line1: z.string(),
  line2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string().optional().default("Australia"),
});

export const requiredAddressSchema = z.object({
  line1: z.string().min(1, {
    message: "Please enter an address",
  }),
  line2: z.string().nullable(),
  city: z.string().min(1, {
    message: "Please enter a city",
  }),
  state: z.string().min(1, {
    message: "Please enter a state",
  }),
  postalCode: z.string().min(1, {
    message: "Please enter a postal code",
  }),
  country: z.string().optional().default("Australia"),
});

export type AddressSchema = z.infer<typeof addressSchema>;

export const getInitialAddressLine = (address: AddressSchema | null) => {
  if (!address) return "";
  const { line1, line2, city, state, postalCode } = address;
  let addressLine = "";
  if (line1) addressLine += `${line1}, `;
  if (line2) addressLine += `${line2}, `;
  if (city) addressLine += `${city}, `;
  if (state) addressLine += `${state}, `;
  if (postalCode) addressLine += `${postalCode}`;
  return addressLine.trim();
};

export const EMPTY_ADDRESS: AddressSchema = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "Australia",
};

export const getInitialAddress = (address: Address | null) => {
  if (!address) return EMPTY_ADDRESS;
  return {
    ...address,
    line2: address.line2 || "",
  };
};

export const superRefineAddress = ({
  address,
  context,
  path,
}: {
  address?: Address;
  context: RefinementCtx;
  path: string;
}) => {
  if (!address?.line1) {
    context.addIssue({
      message: "Please enter an address",
      code: z.ZodIssueCode.custom,
      path: [`${path}.line1`],
    });
  }
  if (!address?.city) {
    context.addIssue({
      message: "Please enter a city",
      code: z.ZodIssueCode.custom,
      path: [`${path}.city`],
    });
  }
  if (!address?.state) {
    context.addIssue({
      message: "Please enter a state",
      code: z.ZodIssueCode.custom,
      path: [`${path}.state`],
    });
  }
  if (!address?.postalCode) {
    context.addIssue({
      message: "Please enter a postal code",
      code: z.ZodIssueCode.custom,
      path: [`${path}.postalCode`],
    });
  }
};

export const toStripeAddress = (address: Address): Stripe.AddressParam => ({
  city: address.city,
  country: address.country,
  line1: address.line1,
  line2: address.line2 || undefined,
  postal_code: address.postalCode,
  state: address.state,
});
