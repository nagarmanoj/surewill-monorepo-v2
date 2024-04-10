import { redirect } from "next/navigation";
import { routes } from "~/config/routes";
import format from "date-fns/format";
import { Introduction } from "~/components/will-summary/Introduction";
import { Assets } from "~/components/will-summary/Assets";
import { WillSection } from "~/components/will-summary/WillSection";
import { Pets } from "~/components/will-summary/Pets";
import { HandleRemains } from "~/components/will-summary/HandleRemains";
import { Executor } from "~/components/will-summary/Executor";
import { Guardian } from "~/components/will-summary/Guardian";
import { BackupGuardian } from "~/components/will-summary/BackupGuardian";
import { PaymentOrGenerate } from "~/components/PaymentOrGenerate";
import { AddressSchema } from "~/utils/addresses";
import { fetchWillWithPets } from "~/utils/will";

type Props = {
  userId: string;
};

export async function WillSummary({ userId }: Props) {
  const will = await fetchWillWithPets(userId);
  if (!will || will.status === "IN_PROGRESS") {
    redirect(routes.dashboard.main);
  }

  if (will.creationType === "CUSTOM") {
    redirect(routes.dashboard.review.custom);
  }

  const willSubject = {
    fullName: `${will.firstName} ${will.middleName} ${will.lastName}`,
    dateOfBirth: format(new Date(will.dateOfBirth), "dd/MM/yyyy"),
    address: will.address as AddressSchema,
  };

  const assetBeneficiaries = will.people.filter(
    (person) => person.category === "BENEFICIARY_ASSETS"
  );

  const executor = will.people.find((person) => person.category === "EXECUTOR");
  const backupExecutor = will.people.find(
    (person) => person.category === "EXECUTOR_BACKUP"
  );
  const peopleWithPets = will.people.filter((person) => !!person.pet);
  const partner = will.people.find((person) => person.category === "PARTNER");
  const guardian = will.people.find((person) => person.category === "GUARDIAN");
  const backupGuardian = will.people.find(
    (person) => person.category === "GUARDIAN_BACKUP"
  );

  const willIsPaid = will.status === "COMPLETE_PAID";

  return (
    <>
      <div className="mb-8 text-xl leading-8">
        <Introduction {...willSubject} />
        <WillSection>
          <Assets partner={partner} assetBeneficiaries={assetBeneficiaries} />
        </WillSection>
        {(will.partnerAsGuardian || guardian) && (
          <WillSection>
            <Guardian
              partnerAsGuardian={will.partnerAsGuardian}
              guardian={guardian}
            />
          </WillSection>
        )}
        {backupGuardian ? (
          <WillSection>
            <BackupGuardian backupGuardian={backupGuardian} />
          </WillSection>
        ) : null}
        {peopleWithPets.length ? (
          <WillSection>
            <Pets peopleWithPets={peopleWithPets} />
          </WillSection>
        ) : null}
        <WillSection>
          <HandleRemains cremated={will.cremated} />
        </WillSection>
        <WillSection>
          <Executor
            professionalAsExecutor={will.professionalAsExecutor}
            partnerAsExecutor={will.partnerAsExecutor}
            executor={executor || null}
          />
        </WillSection>
        {backupExecutor || will.professionalAsBackupExecutor ? (
          <WillSection>
            <Executor
              professionalAsExecutor={will.professionalAsBackupExecutor}
              partnerAsExecutor={false}
              executor={backupExecutor || null}
              isBackup
            />
          </WillSection>
        ) : null}
      </div>
      <PaymentOrGenerate
        willId={will.id}
        willType={will.creationType}
        willIsPaid={willIsPaid}
      />
    </>
  );
}
