"use client";

import Link from "next/link";
import { WillCreationType } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import { useSubmit } from "~/hooks/useSubmit";
import { routes } from "~/config/routes";
import { trackDataLayer } from "~/libs/dataLayer";
import { getCheckoutUrl } from "~/utils/checkout";

type Props = {
  willId: string;
  willType: WillCreationType;
  willIsPaid: boolean;
};

export function PaymentOrGenerate({ willId, willType, willIsPaid }: Props) {
  const { apiFetch, loading, setLoading, toast, push } = useSubmit();

  const handleGenerate = async () => {
    setLoading(true);
    const response = await apiFetch(`/api/wills/${willId}/generate`, {
      method: "POST",
    });
    if (response.success) {
      push(`${routes.dashboard.main}?creating=${new Date().toISOString()}`);
    } else {
      toast.error("Unable to generate your Will");
      setLoading(false);
    }
  };

  return (
    <div>
      {willIsPaid ? (
        <Button onClick={handleGenerate} loading={loading}>
          Update your Will
        </Button>
      ) : (
        <div className="flex flex-col gap-6 md:flex-row">
          <Link
            href={getCheckoutUrl(willType)}
            className={buttonVariants({ variant: "primary" })}
            onClick={() => trackDataLayer({ event: "complete_review" })}
          >
            <span className="mr-2">Continue to payment</span>
            <ArrowRight />
          </Link>
          <Link
            href={routes.dashboard.main}
            className={buttonVariants({ variant: "outline" })}
            onClick={() => trackDataLayer({ event: "complete_review" })}
          >
            <span className="mr-2">Save for later</span>
            <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
