import { PersonCategory } from "@prisma/client";
import {
  Will,
  getNameAndAddress,
  getMoneyValue,
  getPetType,
} from "../../utils";

type Props = {
  will: Will;
};

const getPeopleByCategory = (will: Will, category: PersonCategory) => {
  return will.people.filter((person) => person.category === category) || [];
};

export function EstateSection({ will }: Props) {
  const petPeople = getPeopleByCategory(will, "PET_OWNER");
  const financialBeneficiaries = getPeopleByCategory(
    will,
    "BENEFICIARY_FINANCIAL"
  ).filter((personOrCharity) => !personOrCharity.isCharity);
  const charities = will.people.filter((person) => person.isCharity) || [];
  const specialItemBeneficiaries = getPeopleByCategory(
    will,
    "BENEFICIARY_ITEMS"
  );
  const hasChildren = !!will.people.find(
    (person) => person.category === "GUARDIAN"
  );
  const residualEstateBeneficiaries = will.people.filter(
    (person) => person.category === "BENEFICIARY_ASSETS"
  );
  const childrenPercentageOfResidualEstate =
    will.childrenResidualEstatePercentage;

  const hasOnlyOneResidualEstateBeneficiary =
    residualEstateBeneficiaries.length === 1 &&
    !childrenPercentageOfResidualEstate;

  const hasPassResidualConditions = Boolean(
    will.passResidualEstateToChildren || will.passResidualEstateToSiblings
  );

  const renderBeneficiaries = () => {
    const beneficiaries = residualEstateBeneficiaries.map((person, index) => (
      <div key={index}>
        {person.percentageAssets}% to {getNameAndAddress(person)}.
      </div>
    ));
    if (childrenPercentageOfResidualEstate) {
      beneficiaries.push(
        <div>
          {childrenPercentageOfResidualEstate}% to my kids in equal shares and
          Schedule 1 applies.
        </div>
      );
    }
    return (
      <li>
        to divide and give the residue of my estate to the following people in
        the following shares:
        <div className="ml-12 mt-4 flex flex-col gap-2">{beneficiaries}</div>
      </li>
    );
  };

  const renderProceedingTrusts = () => {
    return (
      <li>
        Should a beneficiary in the preceding clauses of this Will not survive
        me, then Schedule 1 of this Will applies to the gift that beneficiary
        would have otherwise taken.
      </li>
    );
  };

  return (
    <>
      <h2 className="section-heading">Disposal of Estate</h2>
      <hr className="mb-4 border-brand-blue" />
      <ol>
        <li>
          <span>My executor holds my estate on trust:</span>
          <ol className="lower-alpha">
            <>
              {petPeople.map((petPerson) => (
                <li key={petPerson.id}>
                  to give {getMoneyValue(petPerson.pet?.careMoneyAmount || "0")}{" "}
                  along with my {getPetType(petPerson?.pet?.type as string)}{" "}
                  named {petPerson?.pet?.name} to {getNameAndAddress(petPerson)}{" "}
                  in the hope {petPerson.fullName} will look after{" "}
                  {petPerson?.pet?.name}. If {petPerson.fullName} refuses or
                  fails to look after my pet {petPerson?.pet?.name}, the gift in
                  this subclause fails and forms part of my residual estate.
                </li>
              ))}
              {financialBeneficiaries.map((beneficiary) => (
                <li key={beneficiary.id}>
                  subject to the preceding trusts, to give{" "}
                  {getMoneyValue(beneficiary.moneyReceived)} to{" "}
                  {getNameAndAddress(beneficiary)}.
                </li>
              ))}
              {charities.map((charity) => (
                <li key={charity.id}>
                  subject to the preceding trusts, to give{" "}
                  {getMoneyValue(charity.moneyReceived)} to the{" "}
                  {charity.fullName} for its general purposes free of all duties
                  and taxes and I declare that the receipt of its Chief
                  Executive Officer, Chief Financial Officer or other authorised
                  officer shall be sufficient discharge to my executors for this
                  bequest.
                </li>
              ))}
              {specialItemBeneficiaries.map((itemBeneficiary) => (
                <li key={itemBeneficiary.id}>
                  subject to the preceding trusts, to give my{" "}
                  {itemBeneficiary.specialItem?.description} to{" "}
                  {getNameAndAddress(itemBeneficiary)}.
                </li>
              ))}
              {hasOnlyOneResidualEstateBeneficiary ? (
                <li>
                  to give the residue of my estate to{" "}
                  {getNameAndAddress(residualEstateBeneficiaries[0])}.
                </li>
              ) : (
                renderBeneficiaries()
              )}
              {hasPassResidualConditions && (
                <li>
                  subject to the preceding trusts:
                  <ol className="lower-roman">
                    {will.passResidualEstateToChildren &&
                      renderProceedingTrusts()}
                    {will.passResidualEstateToSiblings && (
                      <li>
                        Should I die leaving no person surviving me and entitled
                        to be a beneficiary under{" "}
                        {hasChildren ? "Schedule 1" : "this Will"} then my
                        Executors must hold my Estate on trust to divide equally
                        among those of my brothers and sisters who survive me
                        and have attained or attain their majority.
                      </li>
                    )}
                  </ol>
                </li>
              )}
            </>
          </ol>
        </li>
      </ol>
    </>
  );
}
