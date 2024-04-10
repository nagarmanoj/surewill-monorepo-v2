import type { Person } from "@prisma/client";
import { Highlight } from "./Highlight";
import { Address } from "./Address";

type Props = {
  partnerAsGuardian: boolean;
  guardian?: Person;
};

export function Guardian({ partnerAsGuardian, guardian }: Props) {
  if (partnerAsGuardian) {
    return (
      <p>
        my kid/s to be cared for by <Highlight>my Partner.</Highlight>
      </p>
    );
  }
  if (guardian) {
    return (
      <p>
        my kid/s to be cared for by <Highlight>{guardian?.fullName}</Highlight>,{" "}
        living at <Address address={guardian?.address} />
      </p>
    );
  }
  return <></>;
}
