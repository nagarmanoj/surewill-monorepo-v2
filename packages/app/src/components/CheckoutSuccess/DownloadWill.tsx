"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { Button } from "~/components/ui/button";
import { FinishedWillImage } from "~/components/FinishedWillImage";
import { DownloadWillButton } from "~/components/DownloadWillButton";
import { useInterval } from "~/hooks/useInterval";
import { apiFetch } from "~/libs/fetch";

type Props = {
  willId: string;
  email: string;
  isReadyForDownload: boolean;
};

export function DownloadWill({ willId, email, isReadyForDownload }: Props) {
  const [isReady, setIsReady] = useState(isReadyForDownload);
  const [fireConfetti, setFireConfetti] = useState(false);

  const { clear } = useInterval(async () => {
    const willStatus = await apiFetch<{ readyForDownload: boolean }, {}>(
      `/api/wills/${willId}/status`,
      {
        method: "GET",
      }
    );
    if (willStatus.success && willStatus.data?.readyForDownload) {
      setIsReady(true);
      clear();
    }
  }, 4_000);

  useEffect(() => {
    if (isReady) setFireConfetti(true);
  }, [isReady]);

  if (isReady) {
    return (
      <>
        <p className="mb-6 text-brand-gray">
          We&apos;ve created your shiny new Australian Will and its ready to
          download now! We also emailed a copy to {email}.
        </p>
        <div className="mb-10 max-w-xs">
          <div className="mb-6 flex justify-center">
            <FinishedWillImage />
            <ReactCanvasConfetti
              className="absolute h-[275px]"
              fire={fireConfetti}
              startVelocity={40}
              decay={0.8}
              spread={360}
              angle={90}
              particleCount={500}
              zIndex={-1}
              origin={{
                y: -0.05,
              }}
            />
          </div>
          <DownloadWillButton willId={willId} />
        </div>
      </>
    );
  }

  return (
    <>
      <p className="mb-6 text-brand-gray">
        We&apos;re generating your Will and it&apos;ll be ready to download in
        just a moment!
      </p>
      <div className="mb-8 max-w-xs">
        <div className="mb-6 flex h-[194px] items-center justify-center">
          <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-white">
            <Loader2 className="h-[125px] w-[125px] animate-spin text-brand-green" />
          </div>
        </div>
        <Button variant="primary" className="w-full justify-between" disabled>
          Generating your Will...
        </Button>
      </div>
    </>
  );
}
