"use client";

import { useMemo } from "react";
import Link from "next/link";
import { env } from "@/env.mjs";

type Props = {
  hasSubscription: boolean;
};

export function PaymentManagement({ hasSubscription }: Props) {
  const paymentText = useMemo(() => {
    if (hasSubscription) {
      return <>billing and subscription</>;
    }
    return <>billing</>;
  }, [hasSubscription]);

  return (
    <p className="font-light text-brand-gray">
      You can manage your {paymentText}{" "}
      <Link
        href={env.NEXT_PUBLIC_STRIPE_PORTAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        here.
      </Link>
    </p>
  );
}
