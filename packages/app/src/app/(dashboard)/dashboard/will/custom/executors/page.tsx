import { Suspense } from "react";
import { CustomStepper } from "~/components/Stepper";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { CustomExecutorsSimpleServerForm } from "~/components/will-forms/Custom/Executors";
import LoadingWill from "~/components/will-forms/components/Loading";

export default async function CustomWillExecutorsPage() {
  return (
    <div>
      <CustomStepper activeStep={4} />
      <FormHeading>Who will be responsible to honour your wishes?</FormHeading>
      <Suspense fallback={<LoadingWill />}>
        {/* @ts-expect-error Async Server Component */}
        <CustomExecutorsSimpleServerForm />
      </Suspense>
    </div>
  );
}
