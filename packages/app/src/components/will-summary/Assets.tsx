import type { Person } from "@prisma/client";
import { Highlight } from "./Highlight";
import { Address } from "./Address";

type Props = {
  assetBeneficiaries: Person[];
  partner?: Person;
};

export function Assets({ assetBeneficiaries, partner }: Props) {
  if (partner?.percentageAssets === 100) {
    return (
      <div className="mb-2">
        <p>to give my assets to:</p>
        <p>
          <Highlight>my Partner, {partner?.fullName}</Highlight>, living at{" "}
          <Address address={partner.address} />
        </p>
      </div>
    );
  }
  return (
    <div className="mb-2">
      <p>to give my assets to:</p>
      {assetBeneficiaries.map((beneficiary, index) => (
        <p key={index}>
          <Highlight>{beneficiary.percentageAssets}%</Highlight> to{" "}
          <Highlight>{beneficiary.fullName}</Highlight>, living at{" "}
          <Address address={beneficiary.address} />
        </p>
      ))}
    </div>
  );
}
