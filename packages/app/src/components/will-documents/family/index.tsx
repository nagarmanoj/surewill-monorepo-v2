import { Will } from "../utils";
import { EstateSection } from "./sections/Estate";
import { ExecutorWithBackupSection } from "../shared-sections/ExecutorWithBackup";
import { GuardianSection } from "./sections/Guardian";
import { InternmentSection } from "../shared-sections/Internment";
import { InvestmentSection } from "../shared-sections/Investment";
import { JurisdictionSection } from "../shared-sections/Jurisdiction";
import { PowersOfExecutorSection } from "../shared-sections/PowersOfExecutor";
import { RevocationSection } from "../shared-sections/Revocation";
import { ScheduleOne } from "./sections/ScheduleOne";
import { ScheduleTwo } from "./sections/ScheduleTwo";
import { SignaturePage } from "../shared-sections/SignaturePage";
import { SurvivorshipSection } from "../shared-sections/Survivorship";
import { IntroNameAndAddress } from "../shared-sections/IntroNameAddress";

type Props = {
  will: Will;
};

export function FamilyWillDocument({ will }: Props) {
  return (
    <>
      <div id="will-container">
        <IntroNameAndAddress will={will} />
        <RevocationSection />
        <JurisdictionSection will={will} />
        <GuardianSection will={will} />
        <ExecutorWithBackupSection will={will} />
        <InternmentSection will={will} />
        <SurvivorshipSection />
        <EstateSection will={will} />
        <InvestmentSection />
        <PowersOfExecutorSection />
      </div>
      <div id="will-container" className="break-before-page">
        <ScheduleOne />
      </div>
      <div id="will-container" className="break-before-page">
        <ScheduleTwo will={will} />
      </div>
      <SignaturePage will={will} />
    </>
  );
}
