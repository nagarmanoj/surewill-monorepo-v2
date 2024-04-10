import type { WillWithPets } from "~/utils/will";
import { Highlight } from "./Highlight";
import { Address } from "./Address";

const toSentenceCase = (value: string) => {
  const words = value.split(" ");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

type Props = {
  peopleWithPets: NonNullable<WillWithPets>["people"];
};

export function Pets({ peopleWithPets }: Props) {
  return (
    <div>
      {peopleWithPets.map((person, index) => {
        const petTypeText =
          person?.pet?.type === "other" ? null : (
            <Highlight>{toSentenceCase(person?.pet?.type as string)}</Highlight>
          );
        if (person.isPartner) {
          return (
            <p key={index}>
              to give my pet {petTypeText} named{" "}
              <Highlight>{person?.pet?.name}</Highlight> to my Partner.
            </p>
          );
        }
        return (
          <p key={index}>
            to give my pet {petTypeText} named{" "}
            <Highlight>{person?.pet?.name}</Highlight> to{" "}
            <Highlight>{person.fullName}</Highlight>, living at{" "}
            <Address address={person.address} />.
          </p>
        );
      })}
    </div>
  );
}
