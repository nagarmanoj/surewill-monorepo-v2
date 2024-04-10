import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { Stepper } from "~/components/Stepper";
import { LoadingWillSummary } from "~/components/will-summary/Loading";
import { routes } from "~/config/routes";
import { WillSummary } from "./WillSummary";

export const dynamic = "force-dynamic";

export async function ReviewPage() {
  const { userId } = auth();

  if (!userId) {
    redirect(routes.dashboard.main);
  }

  return (
    <div>
      <Stepper activeStep={3} />
      <h2 className="mb-12 text-3xl font-semibold text-brand-purple">
        We&apos;ll add the legal mumbo jumbo, but here is a summary…
      </h2>
      <Suspense fallback={<LoadingWillSummary />}>
        {/* @ts-expect-error Server Component */}
        <WillSummary userId={userId} />
      </Suspense>
    </div>
  );
}
