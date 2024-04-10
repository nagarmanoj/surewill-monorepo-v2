import { Suspense } from "react";
import { Stepper } from "~/components/Stepper";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { FamilySimpleServerForm } from "~/components/will-forms/Family";
import LoadingWill from "~/components/will-forms/components/Loading";

export const dynamic = "force-dynamic";

export default async function WillFamily() {
  return (
    <div>
      <Stepper activeStep={2} />
      <FormHeading>Who gets what, who does what?</FormHeading>
      <Suspense fallback={<LoadingWill />}>
        {/* @ts-expect-error Async Server Component */}
        <FamilySimpleServerForm />
      </Suspense>
    </div>
  );
}
