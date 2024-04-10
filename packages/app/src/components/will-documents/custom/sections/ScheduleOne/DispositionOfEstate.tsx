import type { Will } from "../../../utils";

type Props = {
  will: Will;
};

export function DispositionOfEstate({ will }: Props) {
  return (
    <div>
      <h2 className="section-heading italic">
        Creation of trusts for my children
      </h2>
      <hr className="mb-4 border-brand-blue" />
      <ol className="lower-alpha">
        <li>
          My executors must divide my estate which includes my residuary estate
          into parts as follows: one part each for my children; and in this
          clause{" "}
          <span className="font-semibold">&lsquo;my children&rsquo;</span>{" "}
          means: those of my children who survive me. Each of those parts is
          referred to as an &lsquo;allocated part&rsquo;. Subject to the{" "}
          <span className="font-semibold">Equalisation of benefits</span> clause
          in this Schedule, the allocated parts must be equal.
        </li>
        <li>
          My executors must transfer each allocated part to the trustee or
          trustees of the respective trust created for each of my children who
          survives me; except where any child having attained the age of{" "}
          {will.inheritanceAge || "18"} years (the{" "}
          <span className="font-semibold">preservation age</span>) requests in
          writing that my executors transfer all or some of it to such child
          absolutely, or deal with it in some other way, my executors may (but
          are not obliged to) do so.
        </li>
      </ol>
    </div>
  );
}
