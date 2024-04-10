export function SurvivorshipSection() {
  return (
    <>
      <h2 className="section-heading">Presumption of Survivorship</h2>
      <hr className="mb-4 border-brand-blue" />
      <ol>
        <li>
          <span>Where:</span>
          <ol className="lower-alpha">
            <li>
              <span>Either:</span>
              <ol className="lower-roman">
                <li>one or more persons have died;</li>
                <li>
                  a person has died and one or more deaths are presumed; or
                </li>
                <li>two or more deaths are presumed; and</li>
              </ol>
            </li>
            <li>
              the order of deaths, whether proved or presumed, is uncertain;
            </li>
            <div className="mt-4 indent-0">
              this Will is to be construed as if the deaths, whether proved or
              presumed, had taken place in the following manner: first, the
              oldest; then, after a period of 1 day, the second oldest; then,
              after a period of 1 day, the third oldest; and so on to the
              youngest.
            </div>
          </ol>
        </li>
        <li>
          Where any beneficial disposition of property is made to a person who
          does not survive me for a period of 30 days the disposition is treated
          as if that person had died before me.
        </li>
        <li>
          <span>In this Will:</span>
          <ol className="lower-alpha">
            <li>
              any gift which depends on the beneficiary surviving me by a
              specified period or attaining a specified age is contingent and
              does not vest in the beneficiary unless and until he or she has
              survived the specified period or attained the specified age; and
            </li>
            <li>
              income produced by the gift between my death and vesting of the
              gift accumulates to the gift.
            </li>
          </ol>
        </li>
      </ol>
    </>
  );
}
