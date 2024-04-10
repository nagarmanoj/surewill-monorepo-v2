import type { Person } from "@prisma/client";
import { Highlight } from "./Highlight";

type Props = {
  professionalAsExecutor: boolean;
  partnerAsExecutor: boolean;
  executor: Person | null;
  isBackup?: boolean;
};

export function Executor({
  professionalAsExecutor,
  partnerAsExecutor,
  executor,
  isBackup = false,
}: Props) {
  const executorText = isBackup ? "backup Executor." : "Executor of my Will.";
  if (professionalAsExecutor) {
    return (
      <p>
        the <Highlight>Public Trustee</Highlight> to act as the {executorText}
      </p>
    );
  }
  if (partnerAsExecutor) {
    return (
      <p>
        <Highlight>my Partner</Highlight> to act as the {executorText}
      </p>
    );
  }
  if (executor) {
    return (
      <p>
        <Highlight>{executor?.fullName}</Highlight> to act as the {executorText}
      </p>
    );
  }
  return null;
}
