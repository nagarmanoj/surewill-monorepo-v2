import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import { env } from "@/env.mjs";

export const SUBSCRIPTION_PRICE_PER_MONTH = Number(
  env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE
);

export const getSubscriptionPaymentDate = () => {
  const nextMonth = addMonths(new Date(), 1);
  return format(nextMonth, "dd/MM/yyyy");
};
