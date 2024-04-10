"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { Button } from "~/components/ui/button";
import { FinishedWillImage } from "~/components/FinishedWillImage";
import { DownloadWillButton } from "~/components/DownloadWillButton";
import { useInterval } from "~/hooks/useInterval";
import { apiFetch } from "~/libs/fetch";
import { useRouter } from "next/navigation";
import { routes } from "~/config/routes";

type Props = {
  willId: string;
  regeneratingWillAt: string;
};

export function RegeneratingWill({ willId, regeneratingWillAt }: Props) {
  const [isReady, setIsReady] = useState(false);
  const { replace } = useRouter();
  const [fireConfetti, setFireConfetti] = useState(false);

  const { clear } = useInterval(async () => {
    const willStatus = await apiFetch<{ hasRegenerated: boolean }, {}>(
      `/api/wills/${willId}/status/regenerate`,
      {
        method: "POST",
        payload: {
          now: regeneratingWillAt,
        },
      }
    );
    if (willStatus.success && willStatus.data?.hasRegenerated) {
      setIsReady(true);
      replace(routes.dashboard.main); // remove the ?creating=true URL param
      clear();
    }
  }, 4_000);

  useEffect(() => {
    if (isReady) setFireConfetti(true);
  }, [isReady]);

  if (isReady) {
    return (
      <>
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
