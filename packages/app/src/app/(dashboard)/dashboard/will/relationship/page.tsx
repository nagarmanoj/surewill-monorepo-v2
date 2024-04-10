import { Suspense } from "react";
import { Stepper } from "~/components/Stepper";
import { FormHeading } from "~/components/will-forms/components/FormHeading";
import { RelationshipSimpleServerForm } from "~/components/will-forms/Relationship";
import LoadingWill from "~/components/will-forms/components/Loading";

export default async function WillRelationship() {
  return (
    <div>
      <Stepper activeStep={2} />
      <FormHeading>Who gets what, who does what?</FormHeading>
      <Suspense fallback={<LoadingWill />}>
        {/* @ts-expect-error Async Server Component */}
        <RelationshipSimpleServerForm />
      </Suspense>
    </div>
  );
}
