import { Will } from "~/components/will-documents/utils";
import { CreationOfTrusts } from "../../../family/sections/ScheduleOne/CreationOfTrusts";
import { DispositionOfEstate } from "./DispositionOfEstate";
import { EqualisationOfBenefits } from "../../../family/sections/ScheduleOne/EqualisationOfBenefits";

type Props = {
  will: Will;
};

export function ScheduleOne({ will }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-semibold italic">
        Schedule 1 - Provision for children and children of predeceased
        children.
      </h3>
      <CreationOfTrusts />
      <DispositionOfEstate will={will} />
      <EqualisationOfBenefits />
    </div>
  );
}
