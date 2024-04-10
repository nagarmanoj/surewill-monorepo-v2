import { Will, getStateOrTerritoryText } from "../utils";

type Props = {
  will: Will;
};

export function JurisdictionSection({ will }: Props) {
  return (
    <>
      <h2 className="section-heading">Jurisdiction</h2>
      <hr className="mb-4 border-brand-blue" />
      <ol>
        <li>
          This my Australian Will is made by me,{" "}
          {getStateOrTerritoryText(will?.address?.state)}.
        </li>
        <li>
          This Will affects my property and affairs in Australia and does not in
          any way take effect in or affect property or affairs of mine outside
          of Australia.
        </li>
        <li>
          This Will takes effect and operates independently of and separately
          from any will made by me in respect of property and affairs of mine
          outside of Australia.
        </li>
      </ol>
    </>
  );
}
