import { ApplicationOfProvisions } from "../../../family/sections/ScheduleTwo/ApplicationOfProvisions";
import { BeneficiariesOfTrust } from "../../../family/sections/ScheduleTwo/BeneficiariesOfTrust";
import { ConflictOfInterest } from "../../../family/sections/ScheduleTwo/ConflictOfInterest";
import { EndingOfTrust } from "../../../family/sections/ScheduleTwo/EndingOfTrust";
import { InvestmentOfFund } from "../../../family/sections/ScheduleTwo/InvestmentOfFund";
import { MannerOfPowers } from "../../../family/sections/ScheduleTwo/MannerOfPowers";
import { PowersOfBeneficiary } from "../../../family/sections/ScheduleTwo/PowersOfBeneficiary";
import { PowersOfTrustees } from "../../../family/sections/ScheduleTwo/PowersOfTrustees";
import { PropertyOfTrust } from "../../../family/sections/ScheduleTwo/PropertyOfTrust";
import { PurposesOfTrust } from "../../../family/sections/ScheduleTwo/PurposesOfTrust";
import { TransferOfPowers } from "../../../family/sections/ScheduleTwo/TransferOfPowers";
import { TrusteeDisqualification } from "../../../family/sections/ScheduleTwo/TrusteeDisqualification";
import { TrusteesOfTrust } from "../../../family/sections/ScheduleTwo/TrusteesOfTrust";
import type { Will } from "../../../utils";

type Props = {
  will: Will;
};

export function ScheduleTwo({ will }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-semibold italic">
        Schedule 2 - Provisions governing each separate trust created by this
        Will. This schedule applies in any event
      </h3>
      <ApplicationOfProvisions />
      <PropertyOfTrust />
      <TrusteesOfTrust will={will} />
      <ConflictOfInterest />
      <TrusteeDisqualification />
      <PurposesOfTrust />
      <BeneficiariesOfTrust />
      <PowersOfBeneficiary />
      <TransferOfPowers />
      <MannerOfPowers />
      <InvestmentOfFund />
      <PowersOfTrustees />
      <EndingOfTrust />
    </div>
  );
}
