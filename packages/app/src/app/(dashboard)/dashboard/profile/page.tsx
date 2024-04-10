import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { WillCreationType } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";
import { ProfileForm } from "~/components/ProfileForm";
import { ProfileFormLoading } from "~/components/ProfileForm/Loading";
import { formatInitialValues } from "~/components/ProfileForm/utils";
import { CustomStepper, Stepper } from "~/components/Stepper";
import { routes } from "~/config/routes";
import { canStillEditWill, fetchWill } from "~/utils/will";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    willType?: WillCreationType;
  };
};
export default async function RegisterProfile({ searchParams }: Props) {
  const user = await currentUser();
  if (!user) {
    redirect(routes.dashboard.main);
  }
  const will = await fetchWill(user.id);
  if (!will && !searchParams.willType) {
    redirect(routes.dashboard.main);
  }

  const canEditCompletedWill = canStillEditWill(will?.firstGeneratedAt);
  if (!canEditCompletedWill) {
    redirect(routes.dashboard.main);
  }

  // After a Will is generated, the first and last names cannot be changed
  const isNameChangeDisabled = Boolean(will?.firstGeneratedAt);

  return (
    <Suspense fallback={<ProfileFormLoading />}>
      {will?.creationType === "CUSTOM" ? (
        <CustomStepper activeStep={1} />
      ) : (
        <Stepper activeStep={1} />
      )}
      <h2 className="mb-4 text-3xl font-semibold text-brand-purple">
        Tell us about you, {user?.firstName}
      </h2>
      <ProfileForm
        willId={will?.id}
        initialValues={formatInitialValues(user, will)}
        willCreationType={searchParams.willType}
        isNameChangeDisabled={isNameChangeDisabled}
      />
    </Suspense>
  );
}
