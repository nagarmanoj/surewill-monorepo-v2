import type { UpdateWillInput } from "~/app/api/wills/[willId]/relationship/types";
import { EMPTY_ADDRESS } from "~/utils/addresses";
import type { WillWithPets } from "~/utils/will";
import { getInitialCremated, getInitialPets } from "../utils";
import type { FieldValues } from "./schema";

export const EMPTY_FORM: FieldValues = {
  cremated: "undecided",
  professionalAsExecutor: false,
  professionalAsBackupExecutor: false,
  siblingsAfterPartner: false,
  partnerAsExecutor: false,
  partner: {
    fullName: "",
    address: EMPTY_ADDRESS,
  },
  pets: [],
  executor: {
    fullName: "",
    address: EMPTY_ADDRESS,
    email: "",
  },
  backupExecutor: {
    fullName: "",
    address: EMPTY_ADDRESS,
    email: "",
  },
};

export const formatInitialValues = (
  initialValues: WillWithPets
): FieldValues => {
  if (!initialValues) return EMPTY_FORM;
  const executor = initialValues?.people?.find(
    (person) => person.category === "EXECUTOR"
  );
  const partner = initialValues?.people?.find(
    (person) => person.category === "PARTNER"
  );
  const backupExecutor = initialValues?.people?.find(
    (person) => person.category === "EXECUTOR_BACKUP"
  );
  return {
    professionalAsExecutor: initialValues.professionalAsExecutor,
    professionalAsBackupExecutor: initialValues.professionalAsBackupExecutor,
    partnerAsExecutor: initialValues.partnerAsExecutor,
    siblingsAfterPartner: initialValues.siblingsAfterPartner,
    executor: executor || EMPTY_FORM["executor"],
    backupExecutor: backupExecutor || EMPTY_FORM["backupExecutor"],
    cremated: getInitialCremated(initialValues.cremated),
    partner: partner || EMPTY_FORM["partner"],
    pets: getInitialPets(initialValues.people) || [],
  };
};

export const formatFormValues = (
  values: FieldValues
): Omit<UpdateWillInput, "isWillPaid"> => {
  return {
    partner: values.partner,
    pets: values.pets,
    cremated:
      values.cremated === "undecided" ? null : values.cremated === "cremated",
    professionalAsExecutor: values.professionalAsExecutor,
    professionalAsBackupExecutor: values.professionalAsBackupExecutor,
    siblingsAfterPartner: values.siblingsAfterPartner,
    partnerAsExecutor: values.partnerAsExecutor,
    executor: values.executor.fullName.length > 1 ? values.executor : undefined,
    backupExecutor:
      values.backupExecutor && values.backupExecutor?.fullName?.length > 1
        ? values.backupExecutor
        : undefined,
  };
};
