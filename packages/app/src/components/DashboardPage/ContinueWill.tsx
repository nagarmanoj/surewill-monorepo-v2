import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Will } from "~/utils/will";
import { NonUndefined } from "~/libs/utils";
import { routes } from "~/config/routes";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/libs/utils";
import { WillType } from "./WillType";
import { WILL_TYPES_CONFIG, CONTINUE_WILL_URLS } from "./config";

type Props = {
  will: NonUndefined<NonNullable<Will>>;
};

export function ContinueWill({ will }: Props) {
  const willConfig = WILL_TYPES_CONFIG.find(
    ({ willType }) => willType === will.creationType
  );
  return (
    <div>
      <h2 className="mb-8 text-3xl font-semibold text-brand-purple">
        Hi {will.firstName}, let&apos;s finish your Will...
      </h2>
      <h3 className="mb-2 text-2xl">Continue</h3>
      <p className="mb-8 text-brand-gray">
        Your moments away from completing your Will
      </p>
      {willConfig && (
        <>
          <div className="mb-4 mt-8 flex justify-center sm:justify-start">
            <WillType {...willConfig} disabled />
          </div>
          <Link
            href={CONTINUE_WILL_URLS[will.creationType]}
            className={cn(
              buttonVariants({ variant: "primary" }),
              "w-full sm:w-[250px]"
            )}
          >
            <span className="mr-4 pl-4">Continue your Will</span> <ArrowRight />
          </Link>
          <p className="mt-8 text-brand-gray">
            Wanted something different? You can choose a{" "}
            <Link href={routes.dashboard.templates} className="underline">
              different Will template here.
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
