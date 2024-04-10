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
                if {getNameAndAddress(partner)} has already died or does not
                survive me or dies before attaining a vested interest, to divide
                the residue of my estate equally among those of my brothers and
                sisters who survive me and have attained or attain their
                majority.
              </li>
              {will.siblingsAfterPartner && (
                <li>
                  if the trusts of a share or shares referred to in the
                  preceding trusts lapse or fail because no person attains a
                  vested interest in that share or those shares, then from the
                  time of that lapse or failure that share or those shares is or
                  are added equally to the other share or shares the trusts of
                  which have not then so lapsed or failed, and this provision
                  applies both to the original shares and to shares which have
                  increased as a result of the application of this provision.
                </li>
              )}
            </>
          </ol>
        </li>
      </ol>
    </>
  );
}
