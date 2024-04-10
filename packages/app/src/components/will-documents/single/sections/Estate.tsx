import { Will, getNameAndAddress, getPetType } from "../../utils";

type Props = {
  will: Will;
};

export function EstateSection({ will }: Props) {
  const petPeople = will.people.filter((person) => !!person.pet);
  const assetBeneficiaries = will.people.filter(
    (person) => person.category === "BENEFICIARY_ASSETS"
  );
  return (
    <>
      <h2 className="section-heading">Disposal of Estate</h2>
      <hr className="mb-4 border-brand-blue" />
      <ol>
        <li>
          <span>My executor holds my estate on trust:</span>
          <ol className="lower-alpha">
            <>
              {petPeople.map(({ fullName, pet }) => (
                <li key={pet?.name}>
                  to give my {getPetType(pet?.type as string)} named {pet?.name}{" "}
                  to {fullName}.
                </li>
              ))}
              <li>
                {assetBeneficiaries.length === 1 ? (
                  `to give the residue of my estate to ${getNameAndAddress(
                    assetBeneficiaries[0]
                  )}.`
                ) : (
                  <>
                    to divide and give the residue of my estate to the following
                    people in the following shares:
                    <div className="mt-6 pl-6">
                      {assetBeneficiaries.map((beneficiary) => (
                        <div key={beneficiary.fullName} className="mb-4">
                          {beneficiary.percentageAssets}% to{" "}
                          {getNameAndAddress(beneficiary)}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </li>
              <li>
                if the trusts of a share or shares referred to in the preceding
                trusts lapse or fail because no person attains a vested interest
                in that share or those shares, then from the time of that lapse
                or failure that share or those shares is or are added equally to
                the other share or shares the trusts of which have not then so
                lapsed or failed, and this provision applies both to the
                original shares and to shares which have increased as a result
                of the application of this provision.
              </li>
            </>
          </ol>
        </li>
      </ol>
    </>
  );
}
