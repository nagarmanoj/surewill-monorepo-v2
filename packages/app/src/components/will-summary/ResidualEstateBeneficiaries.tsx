import { Person } from "@prisma/client";
import { Address } from "./Address";
import { Highlight } from "./Highlight";

type Props = {
  residualEstateBeneficiaries: Person[];
  childrenResidualEstatePercentage: number | null;
};

export function ResidualEstateBeneficiaries({
  residualEstateBeneficiaries,
  childrenResidualEstatePercentage,
}: Props) {
  return (
    <div className="mb-2">
      <p>anything remaining should go to:</p>
      {residualEstateBeneficiaries.map((beneficiary, index) => (
        <p key={index}>
          <Highlight>{beneficiary.percentageAssets}%</Highlight> to{" "}
          <Highlight>{beneficiary.fullName}</Highlight>, living at{" "}
          <Address address={beneficiary.address} />
        </p>
      ))}
      {childrenResidualEstatePercentage &&
      childrenResidualEstatePercentage > 0 ? (
        <p>
          <Highlight>{childrenResidualEstatePercentage}%</Highlight> to my kid/s
          in equal shares
        </p>
      ) : null}
    </div>
  );
}
