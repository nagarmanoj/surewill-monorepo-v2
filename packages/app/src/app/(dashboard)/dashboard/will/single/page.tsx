import { Suspense } from "react";
import { Stepper } from "~/components/Stepper";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { WillSimpleServerForm } from "~/components/will-forms/Simple";
import LoadingWill from "~/components/will-forms/components/Loading";

export default async function WillSingle() {
  return (
    <div>
      <Stepper activeStep={2} />
      <FormHeading>Who gets what, who does what?</FormHeading>
      <Suspense fallback={<LoadingWill />}>
        {/* @ts-expect-error Async Server Component */}
        <WillSimpleServerForm />
      </Suspense>
    </div>
  );
}
