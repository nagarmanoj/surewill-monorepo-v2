import { AddressSchema } from "~/utils/addresses";
import { Highlight } from "./Highlight";
import { Address } from "./Address";

type Props = {
  fullName: string;
  dateOfBirth: string;
  address: AddressSchema;
};

export function Introduction({ fullName, dateOfBirth, address }: Props) {
  return (
    <p className="mb-8">
      I, <Highlight>{fullName}</Highlight>, born on{" "}
      <Highlight>{dateOfBirth}</Highlight>, living at{" "}
      <Address address={address} />, want:
    </p>
  );
}
