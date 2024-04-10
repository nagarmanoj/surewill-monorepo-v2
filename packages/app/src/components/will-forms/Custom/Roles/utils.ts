import { UpdateWillInput } from "~/app/api/wills/[willId]/custom/roles/types";
import type { WillWithPets } from "~/utils/will";
import { getInitialCremated, getInitialPets } from "../../utils";
import { FieldValues } from "./schema";

const EMPTY_FORM: FieldValues = {
  hasChildren: null,
  hasPets: null,
  inheritanceAge: "",
  cremated: "undecided",
  donateOrgans: "no",
  guardian: null,
  backupGuardian: null,
  pets: [],
};

export const formatInitialValues = (
  initialValues: NonNullable<WillWithPets>
): FieldValues => {
  if (!initialValues) return EMPTY_FORM;
  const guardian = initialValues?.people?.find(
    (person) => person.category === "GUARDIAN"
  );
  const backupGuardian = initialValues?.people?.find(
    (person) => person.category === "GUARDIAN_BACKUP"
  );
  const petPerson = initialValues?.people?.find(
    (person) => person.category === "PET_OWNER"
  );
  // the cremated value will be undefined if the user has never submitted this form
  const hasSubmittedForm = typeof initialValues.donateOrgans === "boolean";
  return {
    hasChildren: hasSubmittedForm ? !!guardian : null,
    hasPets: hasSubmittedForm ? !!petPerson : null,
    donateOrgans: !!initialValues.donateOrgans ? "yes" : "no",
    cremated: getInitialCremated(initialValues.cremated),
    guardian: guardian ? guardian : EMPTY_FORM["guardian"],
    backupGuardian: backupGuardian || EMPTY_FORM["backupGuardian"],
    pets: getInitialPets(initialValues?.people) || [],
    inheritanceAge: initialValues.inheritanceAge
      ? initialValues.inheritanceAge.toString()
      : "",
  };
};

export const formatFormValues = (values: FieldValues): UpdateWillInput => {
  return {
    cremated:
      values.cremated === "undecided" ? null : values.cremated === "cremated",
    donateOrgans: values.donateOrgans === "yes",
    guardian: values.guardian || undefined,
    backupGuardian: values.backupGuardian || undefined,
    pets: values.pets?.map((pet) => ({
      ...pet,
      isOwnerPartner: false,
    })),
    inheritanceAge:
      values.guardian && values.inheritanceAge
        ? Number(values.inheritanceAge)
        : undefined,
  };
};
