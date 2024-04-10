import type { Person } from "@prisma/client";
import { Highlight } from "./Highlight";
import { Address } from "./Address";

type Props = {
  peopleWithSpecialItems: Person[];
};

export function SpecialItems({ peopleWithSpecialItems }: Props) {
  return (
    <div className="mb-2">
      <p>some special items to go to:</p>
      {peopleWithSpecialItems.map((person, index) => (
        <p key={index}>
          <Highlight>{person?.specialItem?.description}</Highlight> to{" "}
          <Highlight>{person.fullName}</Highlight>, living at{" "}
          <Address address={person.address} />
        </p>
      ))}
    </div>
  );
}
