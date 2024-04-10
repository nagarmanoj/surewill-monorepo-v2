import { Person } from "@prisma/client";
import { Will, getNameAndAddress, getStateOrTerritoryText } from "../utils";

type Props = {
  will: Will;
};

export function ExecutorWithBackupSection({ will }: Props) {
  const executor = will.people.find(
    (person) => person.category === "EXECUTOR"
  ) as Person;
  const backupExecutor = will.people.find(
    (person) => person.category === "EXECUTOR_BACKUP"
  );
  return (
    <>
      <h2 className="section-heading">Appointment of Executor</h2>
      <hr className="mb-4 border-brand-blue" />
      <ol>
        <li>
          {will.professionalAsExecutor
            ? `I appoint as my executor and trustee the Public Trustee ${getStateOrTerritoryText(
                will.address?.state
              )}.`
            : `I appoint as my executor and trustee ${getNameAndAddress({
                fullName: executor.fullName as string,
                address: executor.address || null,
              })}.`}
        </li>
        {!will.professionalAsExecutor && (
          <li>
            {backupExecutor
              ? `If ${
                  executor.fullName
                } refuses or is unable to act as my executor and trustee I appoint as my executor and trustee ${getNameAndAddress(
                  backupExecutor
                )}.`
              : `If ${
                  executor.fullName
                } refuses or is unable to act as my executor and trustee I appoint the Public Trustee ${getStateOrTerritoryText(
                  will.address?.state
                )}.`}
          </li>
        )}
        <li>
          &lsquo;My executor&rsquo; means the persons named or referred to in
          this clause while acting, and my personal representatives and trustees
          for the time being.
        </li>
        <li>
          Gifts to persons who are named as my executors are not dependent on
          those persons acting as executors or trustees.
        </li>
      </ol>
    </>
  );
}
