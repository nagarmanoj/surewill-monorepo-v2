export function BeneficiariesOfTrust() {
  return (
    <div>
      <h2 className="section-heading italic">Beneficiaries of the trust</h2>
      <hr className="mb-4 border-brand-blue" />
      <ol className="lower-alpha">
        <li>
          The primary beneficiary of the trust is a beneficiary of the trust.
        </li>
        <li>
          The potential beneficiaries of the trust are the following persons,
          whether alive at my death or coming into existence thereafter:
          <ol className="lower-roman">
            <li>the issue of the primary beneficiary;</li>
            <li>a spouse of the primary beneficiary;</li>
            <li>
              the issue of a grandparent of:
              <ol className="number">
                <li>the primary beneficiary; or</li>
                <li>a spouse of the primary beneficiary;</li>
              </ol>
            </li>
            <li>
              a spouse and children of any of the persons specified in the
              preceding paragraphs;
            </li>
            <li>
              a trust, company or other entity in which a person mentioned in
              the preceding paragraphs has an interest, whether absolute,
              direct, indirect, present, contingent or expectant, or is a
              director or shareholder;
            </li>
            <li>a charity or charitable or religious entity.</li>
          </ol>
        </li>
        <li>
          <span className="font-semibold">
            &lsquo;Excluded Beneficiaries&rsquo;
          </span>{" "}
          are persons who are excluded from being beneficiaries or potential
          beneficiaries of the trust and are the following persons or categories
          of person:
          <ol className="lower-roman">
            <li>
              Any foreign persons as defined under the relevant provisions of
              any applicable Duties or Land Tax Act (with reference to the
              Foreign Acquisitions and Takeovers Act or any legislation amending
              or replacing that Act) are hereby excluded as beneficiaries of the
              Trust; and
            </li>
            <li>
              This clause is irrevocable and cannot be altered, despite any
              power to vary, express or otherwise, which but for this clause my
              executors may have.
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
