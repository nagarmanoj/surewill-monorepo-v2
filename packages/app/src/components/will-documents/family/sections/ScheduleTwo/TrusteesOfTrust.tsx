import {
  Will,
  getNameAndAddress,
  getStateOrTerritoryText,
} from "../../../utils";

type Props = {
  will: Will;
};

export function TrusteesOfTrust({ will }: Props) {
  const executor = will.people.find((person) => person.category === "EXECUTOR");
  return (
    <div>
      <h2 className="section-heading italic">
        Trustees of the trust: definition and appointment
      </h2>
      <hr className="mb-4 border-brand-blue" />
      <ol className="lower-alpha">
        <li>
          The trustees of this trust at any time are those of the following who
          have not at that time ceased to be trustees:
          <ol className="lower-roman">
            <li>
              if the primary beneficiary has attained the age of{" "}
              {will.inheritanceAge || "18"} years (the preservation age):
              <ol className="number">
                <li>
                  the trustee or trustees whom the primary beneficiary in her or
                  his discretion appoints in writing in accordance with the
                  provisions of this Will, and the primary beneficiary may
                  appoint herself or himself sole trustee; or
                </li>
                <li>
                  the trustee or trustees appointed by the primary
                  beneficiary&apos;s guardian or legal personal representative
                  if the primary beneficiary is under a legal disability or
                  lacks legal capacity or was under the preservation age when
                  the appointment was made; and
                </li>
              </ol>
            </li>
            <li>
              if the primary beneficiary has not attained the preservation age:
              <ol className="number">
                <li>
                  the trustee or trustees will be{" "}
                  {executor
                    ? getNameAndAddress(executor)
                    : `the Public Trustee ${getStateOrTerritoryText(
                        will.address?.state
                      )}`}
                  ;
                </li>
                <li>
                  the trustee or trustees either cannot or will not act as
                  trustee, the trustee will be the person whom my executors in
                  their discretion appoint;
                </li>
                <li>
                  if my executors are unable to appoint a trustee, the trustee
                  or trustees appointed by the primary beneficiary&apos;s legal
                  guardian; or
                </li>
                <li>the trustee or trustees appointed by the court.</li>
              </ol>
            </li>
          </ol>
        </li>
        <li>
          If no trustee is appointed under clause (a) of this clause 3, my
          executors must appoint a trustee or trustees (who may be one or more
          of the executors) for the trust, and if my executors do not do so,
          then application must be made to the court for a trustee to be
          appointed.
        </li>
        <li>
          The trustees appointed under my Will may be or include a professional
          trustee or professional trustees.
        </li>
        <li>
          In this Schedule{" "}
          <span className="font-semibold">&lsquo;my trustees&rsquo;</span> means
          the person who is trustee or the persons who are trustees under this
          clause.
        </li>
      </ol>
    </div>
  );
}
