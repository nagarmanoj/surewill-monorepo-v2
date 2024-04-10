import Stripe from "stripe";
import { STRIPE_API_VERSION } from "~/libs/stripe";
import { env } from "@/env.mjs";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: STRIPE_API_VERSION,
});
