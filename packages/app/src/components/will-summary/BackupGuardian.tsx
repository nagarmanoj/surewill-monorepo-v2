import type { Person } from "@prisma/client";
import { Highlight } from "./Highlight";
import { Address } from "./Address";

type Props = {
  backupGuardian: Person;
};

export function BackupGuardian({ backupGuardian }: Props) {
  return (
    <p>
      the backup carer for my kid/s to be{" "}
      <Highlight>{backupGuardian?.fullName}</Highlight>, living at{" "}
      <Address address={backupGuardian?.address} />
    </p>
  );
}
