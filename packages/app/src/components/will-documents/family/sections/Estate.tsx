import { Person } from "@prisma/client";
import { Will, getNameAndAddress, getPetType } from "../../utils";

type Props = {
  will: Will;
};

export function EstateSection({ will }: Props) {
  const petPeople = will.people.filter((person) => !!person.pet);
  const partner = will.people.find(
    (person) => person.category === "PARTNER"
  ) as Person;
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
                to give the residue of my estate to {getNameAndAddress(partner)}
                .
              </li>
              <li>
                subject to the preceding trusts:
                <ol className="lower-roman">
                  <li>
                    Should the said beneficiary, {partner.fullName}, not survive
                    me, then Schedule 1 of this Will applies.
                  </li>
                  <li>
                    Should I die leaving no person surviving me and entitled to
                    be a beneficiary under Schedule 1 then my executors must
                    hold my estate on trust to divide equally among those of my
                    brothers and sisters who survive me and have attained or
                    attain their majority.
                  </li>
                </ol>
              </li>
            </>
          </ol>
        </li>
      </ol>
    </>
  );
}
