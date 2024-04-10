import { Stripe, loadStripe } from "@stripe/stripe-js";
import { env } from "@/env.mjs";

export const STRIPE_API_VERSION = "2022-11-15";

let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
      apiVersion: STRIPE_API_VERSION,
    });
  }
  return stripePromise;
};
