import type { WillWithPets } from "~/utils/will";
import { getMoneyValue } from "../will-documents/utils";
import { Highlight } from "./Highlight";

type Props = {
  peopleWithPetMoney: NonNullable<WillWithPets>["people"];
};

export function PetCare({ peopleWithPetMoney }: Props) {
  return (
    <div>
      {peopleWithPetMoney.map((person, index) => (
        <p key={index}>
          <Highlight>{person.fullName}</Highlight> to get{" "}
          <Highlight>{getMoneyValue(person?.pet?.careMoneyAmount)}</Highlight>{" "}
          to care for <Highlight>{person.pet?.name}</Highlight>.
        </p>
      ))}
    </div>
  );
}
