"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { trackDataLayer, CustomEvents } from "~/libs/dataLayer";

type Props = {
  urlParam: string;
  event: CustomEvents;
  data?: Record<string, any>;
};

export function EventTracker({ urlParam, event, data }: Props) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldSendEvent = searchParams?.get(urlParam);
    if (shouldSendEvent) {
      trackDataLayer({ event, data });
      replace(window?.location?.origin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
