import Link from "next/link";
import { DownloadWillButton } from "~/components/DownloadWillButton";
import { FinishedWillImage } from "~/components/FinishedWillImage";
import { NextSteps } from "~/components/NextSteps";
import { routes } from "~/config/routes";
import { daysSinceWillGeneration, EDIT_DURATION_DAYS } from "~/utils/will";
import { RegeneratingWill } from "~/components/RegeneratingWill";

type Props = {
  firstName: string;
  willId: string;
  regeneratingWillAt?: string;
  willGeneratedAt: Date;
  canStillEdit: boolean;
};

export function FinishedWill({
  firstName,
  willId,
  regeneratingWillAt,
  willGeneratedAt,
  canStillEdit,
}: Props) {
  return (
    <div className="max-w-xl">
      <h2 className="mb-8 text-3xl font-semibold text-brand-purple">
        Welcome back {firstName}
      </h2>
      <h3 className="mb-2 text-2xl">Your Will</h3>
      <p className="mb-8 text-brand-gray">
        You can come back and download your Australian Will at any time! Keep in
        mind, only the printed and signed version is legally binding.
      </p>
      <div className="flex flex-col gap-8">
        {regeneratingWillAt ? (
          <RegeneratingWill
            willId={willId}
            regeneratingWillAt={regeneratingWillAt}
          />
        ) : (
          <div className="max-w-xs">
            <div className="mb-6 flex flex-col items-center">
              <FinishedWillImage />
            </div>
            <DownloadWillButton willId={willId} />
          </div>
        )}
        <NextSteps />
        {canStillEdit ? (
          <div className="text-brand-gray">
            <p className="font-semibold">
              Noticed an error or wanted something different?
            </p>
            <p className="font-light">
              You can{" "}
              <Link href={routes.dashboard.editWill} className="underline">
                make changes to your Will
              </Link>{" "}
              free for the next{" "}
              {EDIT_DURATION_DAYS - daysSinceWillGeneration(willGeneratedAt)}{" "}
              days.
            </p>
          </div>
        ) : (
          <div className="text-brand-gray">
            <p className="font-semibold">Something changed?</p>
            <p className="font-light">
              When life events happen, you can{" "}
              <Link href={routes.dashboard.startAgain} className="underline">
                create a new Will here.
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
