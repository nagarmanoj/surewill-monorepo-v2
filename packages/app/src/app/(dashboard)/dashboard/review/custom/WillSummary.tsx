import { redirect } from "next/navigation";
import { routes } from "~/config/routes";
import format from "date-fns/format";
import { Skeleton } from "~/components/ui/skeleton";
import { Introduction } from "~/components/will-summary/Introduction";
import { WillSection } from "~/components/will-summary/WillSection";
import { Pets } from "~/components/will-summary/Pets";
import { HandleRemains } from "~/components/will-summary/HandleRemains";
import { Executor } from "~/components/will-summary/Executor";
import { Guardian } from "~/components/will-summary/Guardian";
import { BackupGuardian } from "~/components/will-summary/BackupGuardian";
import { PetCare } from "~/components/will-summary/PetCare";
import { DonateOrgans } from "~/components/will-summary/DonateOrgans";
import { SpecialItems } from "~/components/will-summary/SpecialItems";
import { ResidualEstateBeneficiaries } from "~/components/will-summary/ResidualEstateBeneficiaries";
import { FinancialBeneficiaries } from "~/components/will-summary/FinancialBeneficiaries";
import { PaymentOrGenerate } from "~/components/PaymentOrGenerate";
import { Inheritance } from "~/components/will-summary/Inheritance";
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

  const willSubject = {
    fullName: `${will.firstName} ${will.middleName} ${will.lastName}`,
    dateOfBirth: format(new Date(will.dateOfBirth), "dd/MM/yyyy"),
    address: will.address as AddressSchema,
  };

  const assetBeneficiaries = will.people.filter(
    (person) => person.category === "BENEFICIARY_ASSETS"
  );
  const financialBeneficiaries = will.people.filter(
    (person) => person.category === "BENEFICIARY_FINANCIAL"
  );
  const executor = will.people.find((person) => person.category === "EXECUTOR");
  const backupExecutor = will.people.find(
    (person) => person.category === "EXECUTOR_BACKUP"
  );
  const peopleWithPets = will.people.filter((person) => !!person.pet);
  const peopleWithPetMoney = will.people.filter(
    (person) => person?.pet?.careMoneyAmount
  );
  const peopleWithSpecialItems = will.people.filter(
    (person) => person.category === "BENEFICIARY_ITEMS"
  );
  const guardian = will.people.find((person) => person.category === "GUARDIAN");
  const backupGuardian = will.people.find(
    (person) => person.category === "GUARDIAN_BACKUP"
  );

  const willIsPaid = will.status === "COMPLETE_PAID";

  return (
    <>
      <div className="mb-8 text-xl leading-8">
        <Introduction {...willSubject} />
        {guardian ? (
          <WillSection>
            <Guardian
              partnerAsGuardian={will.partnerAsGuardian}
              guardian={guardian}
            />
          </WillSection>
        ) : null}
        {backupGuardian ? (
          <WillSection>
            <BackupGuardian backupGuardian={backupGuardian} />
          </WillSection>
        ) : null}
        {will.inheritanceAge && (
          <WillSection>
            <Inheritance inheritanceAge={will.inheritanceAge} />
          </WillSection>
        )}
        {peopleWithPets.length ? (
          <WillSection>
            <Pets peopleWithPets={peopleWithPets} />
          </WillSection>
        ) : null}
        <WillSection>
          <HandleRemains cremated={will.cremated} />
        </WillSection>
        {will.donateOrgans ? (
          <WillSection>
            <DonateOrgans />
          </WillSection>
        ) : null}
        {financialBeneficiaries.length ? (
          <WillSection>
            <FinancialBeneficiaries
              financialBeneficiaries={financialBeneficiaries}
            />
          </WillSection>
        ) : null}
        {peopleWithSpecialItems.length ? (
          <WillSection>
            <SpecialItems peopleWithSpecialItems={peopleWithSpecialItems} />
          </WillSection>
        ) : null}
        {peopleWithPetMoney.length ? (
          <WillSection>
            <PetCare peopleWithPetMoney={peopleWithPetMoney} />
          </WillSection>
        ) : null}
        {assetBeneficiaries.length ? (
          <WillSection>
            <ResidualEstateBeneficiaries
              residualEstateBeneficiaries={assetBeneficiaries}
              childrenResidualEstatePercentage={
                will.childrenResidualEstatePercentage || null
              }
            />
          </WillSection>
        ) : null}
        <WillSection>
          <Executor
            professionalAsExecutor={will.professionalAsExecutor}
            partnerAsExecutor={will.partnerAsExecutor}
            executor={executor || null}
          />
        </WillSection>
        <WillSection>
          <Executor
            professionalAsExecutor={will.professionalAsBackupExecutor}
            partnerAsExecutor={false}
            executor={backupExecutor || null}
            isBackup
          />
        </WillSection>
      </div>
      <PaymentOrGenerate
        willId={will.id}
        willType={will.creationType}
        willIsPaid={willIsPaid}
      />
    </>
  );
}

export function LoadingWillSummary() {
  return (
    <div className="max-w-3xl">
      <Skeleton className="mb-4 h-8" />
      <Skeleton className="mb-4 h-8" />
      <Skeleton className="mb-4 h-8" />
      <Skeleton className="mb-4 h-8" />
      <Skeleton className="mb-4 h-8" />
      <Skeleton className="mb-4 h-8" />
      <Skeleton className="mb-4 h-8" />
      <Skeleton className="mb-4 h-8" />
    </div>
  );
}
