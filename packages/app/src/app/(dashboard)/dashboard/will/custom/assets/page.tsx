import { Suspense } from "react";
import { CustomStepper } from "~/components/Stepper";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { CustomAssetsSimpleServerForm } from "~/components/will-forms/Custom/Assets";
import LoadingWill from "~/components/will-forms/components/Loading";

export default async function CustomWillAssetsPage() {
  return (
    <div>
      <CustomStepper activeStep={3} />
      <FormHeading>Who gets what?</FormHeading>
      <Suspense fallback={<LoadingWill />}>
        <p className="-mt-6 mb-6 text-brand-gray">
          I know that my debts will be paid first. I want what is left to be
          divided as follows:
        </p>
        {/* @ts-expect-error Async Server Component */}
        <CustomAssetsSimpleServerForm />
      </Suspense>
    </div>
  );
}
