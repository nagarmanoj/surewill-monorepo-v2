import { Person } from "@prisma/client";
import { Will, getNameAndAddress } from "../../utils";

type Props = {
  will: Will;
};

export function GuardianSection({ will }: Props) {
  const guardian = will.people.find(
    (person) => person.category === "GUARDIAN"
  ) as Person;
  const backupGuardian = will.people.find(
    (person) => person.category === "GUARDIAN_BACKUP"
  ) as Person;
  return (
    <>
      <h2 className="section-heading">Appointment of Guardian</h2>
      <hr className="mb-4 border-brand-blue" />
      <ol>
        <li>
          I appoint {getNameAndAddress(guardian)} as the guardian of any child
          of mine who is under the age of 18.
        </li>
        <li>
          If the said {guardian.fullName} is unable or unwilling to accept this
          appointment, then I appoint {getNameAndAddress(backupGuardian)} as the
          guardian of any child of mine who is under the age of 18.
        </li>
        <li>
          Whether or not in so doing they exhaust my estate, my executors may
          make loans:
          <ol className="lower-alpha">
            <li>whether secured or unsecured;</li>
            <li>on interest or interest free;</li>
            <li>
              on whatever terms my executors (without being liable for loss)
              think fit;
            </li>
            <div className="mt-4 indent-0">
              to any person caring for any of my children (whether as guardian
              or otherwise) (even though that person is also my executor) from
              the presumptive share of the trust fund of that child or those
              children.
            </div>
          </ol>
        </li>
        <li>
          I wish my executors to exercise their powers so as to ensure (so far
          as seems to them reasonable having regard to the funds at their
          disposal and other relevant matters) that any person caring for any of
          my children (whether as guardian or otherwise) does not suffer in the
          course of caring for those children a financial burden or loss
          (whether or not it is incurred strictly within her or his duties as
          carer or guardian), and I trust that the carer will accept it as my
          wish that the powers be exercised in this way.
        </li>
        <li>
          In this Will, the term child or children means biological and legally
          adopted children but excludes stepchildren and foster children.
        </li>
      </ol>
    </>
  );
}
