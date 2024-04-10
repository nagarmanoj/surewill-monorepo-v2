import type { UpdateWillInput } from "~/app/api/wills/[willId]/single/types";
import { EMPTY_ADDRESS } from "~/utils/addresses";
import type { WillWithPets } from "~/utils/will";
import { getInitialCremated, getInitialPets } from "../utils";
import type { FieldValues } from "./schema";

export const EMPTY_FORM: FieldValues = {
  cremated: "undecided",
  professionalAsExecutor: false,
  assetBeneficiaries: [
    {
      fullName: "",
      address: EMPTY_ADDRESS,
      percentageAssets: "100",
    },
  ],
  pets: [],
  executor: {
    fullName: "",
    address: EMPTY_ADDRESS,
    email: "",
  },
};

type DefinedWill = NonNullable<WillWithPets>;

const getInitialAssetBeneficiaries = (people: DefinedWill["people"]) => {
  const assetBeneficiaries = people
    ?.filter((person) => person.category === "BENEFICIARY_ASSETS")
    .map((person) => ({
      ...person,
      percentageAssets: person.percentageAssets?.toString() as string,
    }));
  if (!assetBeneficiaries.length) return EMPTY_FORM["assetBeneficiaries"];
  return assetBeneficiaries;
};

export const formatInitialValues = (
  initialValues: DefinedWill
): FieldValues => {
  const executor = initialValues?.people?.find(
    (person) => person.category === "EXECUTOR"
  );
  return {
    professionalAsExecutor: !!initialValues.professionalAsExecutor,
    executor: executor || EMPTY_FORM["executor"],
    cremated: getInitialCremated(initialValues.cremated),
    assetBeneficiaries: getInitialAssetBeneficiaries(initialValues?.people),
    pets: getInitialPets(initialValues?.people) || [],
  };
};

export const formatFormValues = (
  values: FieldValues
): Omit<UpdateWillInput, "isWillPaid"> => {
  return {
    assets: values.assetBeneficiaries.map((beneficiary) => ({
      ...beneficiary,
      percentageAssets: Number(beneficiary.percentageAssets),
    })),
    pets: values.pets,
    cremated:
      values.cremated === "undecided" ? null : values.cremated === "cremated",
    professionalAsExecutor: values.professionalAsExecutor,
    executor: values.professionalAsExecutor ? undefined : values.executor,
  };
};
