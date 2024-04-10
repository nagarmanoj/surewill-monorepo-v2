import type { Will } from "../../utils";

type Props = {
  will: Will;
};

export function InternmentSection({ will }: Props) {
  const renderHandleRemains = () => {
    if (typeof will.cremated !== "boolean") {
      return `I wish for the disposal of my body and funeral service to be conducted in such manner as my executor deems appropriate.`;
    }
    let handleRemains = will.cremated ? "cremated" : "buried";
    return `I wish to be ${handleRemains}, and for my funeral service to be conducted in such manner as my executor deems appropriate.`;
  };
  return (
    <>
      <h2 className="section-heading">Interment</h2>
      <hr className="mb-4 border-brand-blue" />
      <ol>
        <li>{renderHandleRemains()}</li>
        <li>
          If I die overseas my executor can decide to have my body cremated and
          my ashes returned to Australia.
        </li>
        <li>
          I declare my body {will.donateOrgans ? "is" : "is not"} available for
          any anatomical, therapeutic, medical or scientific purposes.
        </li>
      </ol>
    </>
  );
}
