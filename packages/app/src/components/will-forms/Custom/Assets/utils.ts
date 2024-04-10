import { UpdateWillInput } from "~/app/api/wills/[willId]/custom/assets/types";
import { EMPTY_ADDRESS } from "~/utils/addresses";
import type { WillWithPets } from "~/utils/will";
import type { FieldValues } from "./schema";

const EMPTY_FORM: FieldValues = {
  financialBeneficiaries: [
    {
      fullName: "",
      charityName: "",
      address: EMPTY_ADDRESS,
      moneyReceived: "",
    },
  ],
  petCare: [],
  specialItems: [
    {
      fullName: "",
      address: EMPTY_ADDRESS,
      itemDescription: "",
    },
  ],
  residualEstateBeneficiaries: [
    {
      fullName: "",
      address: EMPTY_ADDRESS,
      percentageAssets: "100",
      isChildren: false,
    },
  ],
  passResidualEstateToChildren: false,
  passResidualEstateToSiblings: false,
};

// Used just to pass form validation and then stripped out
const CHILDREN_BENEFICIARIES_ADDRESS = {
  line1: "-",
  line2: "-",
  city: "-",
  state: "-",
  postalCode: "-",
  country: "-",
};

export const RESIDENTIAL_ESTATE_CHILD_BENEFICIARY = {
  fullName: "My kid/s in equal shares",
  percentageAssets: "",
  address: CHILDREN_BENEFICIARIES_ADDRESS,
  isChildren: true,
};

export const formatInitialValues = (
  initialValues: NonNullable<WillWithPets>
): FieldValues => {
  if (!initialValues) return EMPTY_FORM;
  const petPeople = initialValues.people.filter((person) => !!person.pet);
  const specialItemPeople = initialValues.people.filter(
    (person) => !!person.specialItem
  );
  const financialBeneficiaries = initialValues.people.filter(
    (person) => person.category === "BENEFICIARY_FINANCIAL"
  );

  const residualEstateBeneficiaries = initialValues.people
    .filter((person) => person.category === "BENEFICIARY_ASSETS")
    .map((beneficiary) => ({
      fullName: beneficiary.fullName,
      address: beneficiary.address,
      percentageAssets: beneficiary.percentageAssets?.toString() as string,
      isChildren: false,
    }));
  if (initialValues.childrenResidualEstatePercentage) {
    residualEstateBeneficiaries.push({
      ...RESIDENTIAL_ESTATE_CHILD_BENEFICIARY,
      percentageAssets:
        initialValues.childrenResidualEstatePercentage?.toString() as string,
    });
  }

  // the remainingBeneficiary value will only be undefined if the user has never submitted this form
  const hasSubmittedForm =
    !!residualEstateBeneficiaries.length ||
    initialValues.childrenResidualEstatePercentage;

  return {
    financialBeneficiaries: hasSubmittedForm
      ? financialBeneficiaries.map((beneficiary) => ({
          ...beneficiary,
          charityName: beneficiary.isCharity ? beneficiary.fullName : "",
          moneyReceived: beneficiary.moneyReceived || undefined,
        }))
      : EMPTY_FORM.financialBeneficiaries,
    petCare:
      petPeople?.map((personWithPet) => ({
        petId: personWithPet?.pet?.id || "",
        petName: personWithPet?.pet?.name || "",
        ownerName: personWithPet.fullName,
        careMoneyAmount: personWithPet.pet?.careMoneyAmount || "",
      })) || EMPTY_FORM["petCare"],
    specialItems: hasSubmittedForm
      ? specialItemPeople.map((personWithItem) => ({
          fullName: personWithItem.fullName,
          address: personWithItem.address,
          itemDescription: personWithItem.specialItem?.description || "",
        }))
      : EMPTY_FORM["specialItems"],
    residualEstateBeneficiaries: hasSubmittedForm
      ? residualEstateBeneficiaries
      : EMPTY_FORM["residualEstateBeneficiaries"],
    passResidualEstateToChildren: !!initialValues.passResidualEstateToChildren,
    passResidualEstateToSiblings: !!initialValues.passResidualEstateToSiblings,
  };
};

export const formatFormValues = (values: FieldValues): UpdateWillInput => {
  const residualEstateChildren = values.residualEstateBeneficiaries.filter(
    (beneficiary) => beneficiary.isChildren
  );
  const totalAssetsToChildren = residualEstateChildren.reduce((total, curr) => {
    total += Number(curr.percentageAssets);
    return total;
  }, 0);

  const residualEstateExcludeChildren = values.residualEstateBeneficiaries
    .filter((beneficiary) => !beneficiary.isChildren)
    .map((beneficiary) => ({
      fullName: beneficiary.fullName,
      address: beneficiary.address,
      percentageAssets: Number(beneficiary.percentageAssets || "0"),
    }));
  return {
    petCareMoney: values.petCare
      .filter((petCare) => petCare.careMoneyAmount)
      .map((petCare) => ({
        petId: petCare.petId,
        careMoneyAmount: petCare.careMoneyAmount as string,
      })),
    financialBeneficiaries: values.financialBeneficiaries
      .filter(
        (beneficiary) => !!beneficiary.fullName || !!beneficiary.charityName
      )
      .map((beneficiary) => ({
        fullName: beneficiary.charityName || beneficiary.fullName,
        address: beneficiary.address,
        moneyReceived: beneficiary.moneyReceived as string,
        isCharity: !!beneficiary.charityName,
      })),
    itemBeneficiaries: values.specialItems.filter(
      (beneficiary) => !!beneficiary.fullName
    ),
    residualEstateBeneficiaries: residualEstateExcludeChildren,
    passResidualEstateToChildren: values.passResidualEstateToChildren,
    passResidualEstateToSiblings: values.passResidualEstateToSiblings,
    childrenResidualEstatePercentage: totalAssetsToChildren,
  };
};
