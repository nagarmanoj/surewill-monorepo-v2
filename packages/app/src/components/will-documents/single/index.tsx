import { Will } from "../utils";
import { EstateSection } from "./sections/Estate";
import { ExecutorSection } from "./sections/Executor";
import { InternmentSection } from "../shared-sections/Internment";
import { InvestmentSection } from "../shared-sections/Investment";
import { JurisdictionSection } from "../shared-sections/Jurisdiction";
import { PowersOfExecutorSection } from "../shared-sections/PowersOfExecutor";
import { RevocationSection } from "../shared-sections/Revocation";
import { SignaturePage } from "../shared-sections/SignaturePage";
import { SurvivorshipSection } from "../shared-sections/Survivorship";
import { IntroNameAndAddress } from "../shared-sections/IntroNameAddress";

type Props = {
  will: Will;
};

export function SingleWillDocument({ will }: Props) {
  return (
    <div id="will-container">
      <IntroNameAndAddress will={will} />
      <RevocationSection />
      <JurisdictionSection will={will} />
      <ExecutorSection will={will} />
      <InternmentSection will={will} />
      <SurvivorshipSection />
      <EstateSection will={will} />
      <InvestmentSection />
      <PowersOfExecutorSection />
      <SignaturePage will={will} />
    </div>
  );
}
