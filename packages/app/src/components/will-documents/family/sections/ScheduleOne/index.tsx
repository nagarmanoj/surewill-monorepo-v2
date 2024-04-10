import { CreationOfTrusts } from "./CreationOfTrusts";
import { DispositionOfEstate } from "./DispositionOfEstate";
import { EqualisationOfBenefits } from "./EqualisationOfBenefits";

export function ScheduleOne() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-semibold italic">
        Schedule 1 - Provision for children and children of predeceased
        children.
      </h3>
      <CreationOfTrusts />
      <DispositionOfEstate />
      <EqualisationOfBenefits />
    </div>
  );
}
