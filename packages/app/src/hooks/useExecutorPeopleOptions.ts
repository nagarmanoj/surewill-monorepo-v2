import { useState } from "react";
import { AddressSchema } from "~/utils/addresses";

type Person = { fullName: string; address: AddressSchema };

const personHasDetails = (person: {
  fullName: string;
  address: AddressSchema;
}) => {
  return Boolean(person?.fullName && person?.address?.postalCode?.length > 1);
};

const peopleAreSame = (person1?: Person, partner2?: Person) => {
  if (person1?.fullName && partner2?.fullName) {
    return person1?.fullName === partner2.fullName;
  }
  return false;
};

type HookArgs = {
  partner: Person;
  guardian: Person;
  backupGuardian: Person;
  initialExecutor?: Person;
  partnerAsExecutor: boolean;
  executor?: Person;
};

export function useExecutorPeopleOptions({
  partner,
  guardian,
  backupGuardian,
  initialExecutor,
  partnerAsExecutor,
  executor,
}: HookArgs) {
  const [guardianAsExecutor, setGuardianAsExecutor] = useState(
    peopleAreSame(initialExecutor, guardian)
  );
  const [backupGuardianAsExecutor, setBackupGuardianAsExecutor] = useState(
    peopleAreSame(initialExecutor, backupGuardian)
  );

  const shouldRenderPartnerOption = () => {
    if (partnerAsExecutor) return true;
    if (executor?.fullName) {
      if (!partner?.fullName?.includes(executor.fullName)) {
        return false;
      }
    }
    return personHasDetails(partner);
  };

  const shouldRenderGuardianOption = () => {
    if (guardianAsExecutor) return true;
    if (executor?.fullName && executor.fullName !== guardian?.fullName) {
      return false;
    }
    return personHasDetails(guardian);
  };

  const shouldRenderBackupExecutorOption = () => {
    if (backupGuardianAsExecutor) return true;
    if (executor?.fullName && executor.fullName !== backupGuardian?.fullName) {
      return false;
    }
    return personHasDetails(backupGuardian);
  };

  const shouldRenderEmailInput =
    partnerAsExecutor || guardianAsExecutor || backupGuardianAsExecutor;

  return {
    shouldRenderPartnerOption,
    shouldRenderGuardianOption,
    shouldRenderBackupExecutorOption,
    setGuardianAsExecutor,
    setBackupGuardianAsExecutor,
    shouldRenderEmailInput,
    partnerAsExecutor,
    guardianAsExecutor,
    backupGuardianAsExecutor,
    hasPeopleOptions:
      shouldRenderPartnerOption() ||
      shouldRenderGuardianOption() ||
      shouldRenderBackupExecutorOption(),
  };
}
