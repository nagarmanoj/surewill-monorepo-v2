import type { Person } from "@prisma/client";
import { getMoneyValue } from "../will-documents/utils";
import { Highlight } from "./Highlight";
import { Address } from "./Address";

type Props = {
  financialBeneficiaries: Person[];
};

export function FinancialBeneficiaries({ financialBeneficiaries }: Props) {
  return (
    <div className="mb-2">
      <p>to give some money to:</p>
      {financialBeneficiaries.map((personOrCharity, index) => {
        if (personOrCharity.isCharity) {
          return (
            <p key={index}>
              <Highlight>
                {getMoneyValue(personOrCharity?.moneyReceived)}
              </Highlight>{" "}
              to <Highlight>{personOrCharity.fullName}</Highlight> charity
            </p>
          );
        }
        return (
          <p key={index}>
            <Highlight>
              {getMoneyValue(personOrCharity?.moneyReceived)}
            </Highlight>{" "}
            to <Highlight>{personOrCharity.fullName}</Highlight>, living at{" "}
            <Address address={personOrCharity.address} />
          </p>
        );
      })}
    </div>
  );
}
