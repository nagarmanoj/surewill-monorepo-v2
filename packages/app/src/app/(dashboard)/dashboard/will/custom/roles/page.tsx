import { Suspense } from "react";
import { CustomStepper } from "~/components/Stepper";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { CustomRoleSimpleServerForm } from "~/components/will-forms/Custom/Roles";
import LoadingWill from "~/components/will-forms/components/Loading";

export default async function CustomWillRolesPage() {
  return (
    <div>
      <CustomStepper activeStep={2} />
      <Suspense fallback={<LoadingWill />}>
        <FormHeading>Who does what?</FormHeading>
        {/* @ts-expect-error Async Server Component */}
        <CustomRoleSimpleServerForm />
      </Suspense>
    </div>
  );
}
