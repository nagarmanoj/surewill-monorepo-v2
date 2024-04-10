import { ApplicationOfProvisions } from "./ApplicationOfProvisions";
import { PropertyOfTrust } from "./PropertyOfTrust";
import { TrusteesOfTrust } from "./TrusteesOfTrust";
import type { Will } from "../../../utils";
import { ConflictOfInterest } from "./ConflictOfInterest";
import { TrusteeDisqualification } from "./TrusteeDisqualification";
import { PurposesOfTrust } from "./PurposesOfTrust";
import { BeneficiariesOfTrust } from "./BeneficiariesOfTrust";
import { PowersOfBeneficiary } from "./PowersOfBeneficiary";
import { TransferOfPowers } from "./TransferOfPowers";
import { MannerOfPowers } from "./MannerOfPowers";
import { InvestmentOfFund } from "./InvestmentOfFund";
import { PowersOfTrustees } from "./PowersOfTrustees";
import { EndingOfTrust } from "./EndingOfTrust";

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
