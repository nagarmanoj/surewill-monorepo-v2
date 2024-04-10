import { Will, getNameAndAddress, getStateOrTerritoryText } from "../../utils";

type Props = {
  will: Will;
};

export function ExecutorSection({ will }: Props) {
  const executor = will.people.find((person) => person.category === "EXECUTOR");
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
                fullName: executor?.fullName as string,
                address: executor?.address || null,
              })}.`}
        </li>
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
