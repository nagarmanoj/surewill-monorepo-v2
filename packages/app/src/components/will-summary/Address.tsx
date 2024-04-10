import { AddressSchema, getInitialAddressLine } from "~/utils/addresses";
import { Highlight } from "./Highlight";

type Props = {
  address: AddressSchema;
};

export function Address({ address }: Props) {
  return <Highlight>{getInitialAddressLine(address)}</Highlight>;
}
