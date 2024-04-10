"use client";

import { useCallback, useEffect } from "react";
import { trackDataLayer } from "~/libs/dataLayer";
import type { PurchaseTrackingData } from "~/utils/tracking";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  purchaseTrackingData: PurchaseTrackingData;
};

export function TrackPurchaseEvent({ purchaseTrackingData }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ga4 = searchParams?.get("ga4");

  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (searchParams) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);

        return params.toString();
      }
    },
    [searchParams]
  );
  useEffect(() => {
    if (ga4 === null || ga4 !== "completed") {
      trackDataLayer({
        event: "purchase",
        data: purchaseTrackingData,
      });
      router.push(pathname + "?" + createQueryString("ga4", "completed"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
