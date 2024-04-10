import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { routes } from "~/config/routes";
import { buttonVariants } from "~/components/ui/button";
import { WillType } from "~/components/DashboardPage/WillType";
import {
  WILL_TYPES_CONFIG,
  CONTINUE_WILL_URLS,
} from "~/components/DashboardPage/config";
import {
  canStillEditWill,
  fetchWill,
  daysSinceWillGeneration,
  EDIT_DURATION_DAYS,
} from "~/utils/will";

export default async function ContinueWill() {
  const { userId } = auth();
  if (!userId) {
    redirect(routes.auth.signIn);
  }
  const will = await fetchWill(userId);
  if (!will) {
    redirect(routes.dashboard.main);
  }

  if (will.status !== "COMPLETE_PAID") {
    redirect(routes.dashboard.main);
  }
  const editFinishedWill = canStillEditWill(will.firstGeneratedAt as Date);
  if (!editFinishedWill) {
    redirect(routes.dashboard.main);
  }

  const willConfig = WILL_TYPES_CONFIG.find(
    ({ willType }) => willType === will.creationType
  );

  return (
    <div>
      <h2 className="mb-8 text-3xl font-semibold text-brand-purple">
        Edit your Will...
      </h2>
      <h3 className="mb-2 text-2xl">Edit</h3>
      <p className="mb-8 text-brand-gray">
        You can make changes to your Will free for the next{" "}
        {EDIT_DURATION_DAYS -
          daysSinceWillGeneration(will.firstGeneratedAt as Date)}{" "}
        days.
      </p>
      {willConfig && (
        <>
          <div className="mb-4 mt-8 flex justify-center sm:justify-start">
            <WillType {...willConfig} disabled />
          </div>
          <Link
            href={CONTINUE_WILL_URLS[will.creationType]}
            className={buttonVariants({ variant: "primary" })}
          >
            <span className="mr-4 pl-4">Edit your Will</span> <ArrowRight />
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
