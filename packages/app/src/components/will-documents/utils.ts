import { AddressSchema, getInitialAddressLine } from "~/utils/addresses";
import { WillWithPets } from "~/utils/will";

export type Will = NonNullable<WillWithPets>;

export const getWillOwnerName = (will: Will | Omit<Will, "people">) => {
  if (will?.middleName) {
    return `${will.firstName} ${will.middleName} ${will.lastName}`;
  }
  return `${will.firstName} ${will.lastName}`;
};

export const getNameAndAddress = ({
  fullName,
  address,
}: {
  fullName: string;
  address: AddressSchema | null;
}) => {
  return `${fullName} of ${getInitialAddressLine(address)}`;
};

export const getMoneyValue = (money?: string | null) => {
  const moneyAsNumber = parseFloat(money || "0");
  const formattedMoney = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(moneyAsNumber);
  return formattedMoney;
};

export const stateIsTerritory = (state?: string) => {
  if (!state) return false;
  const formattedState = state.toLowerCase();
  if (formattedState.includes("northern territory")) return true;
  if (formattedState.includes("australian capital territory")) return true;
  return false;
};

export const getAddressForStateOrTerritory = (address: Will["address"]) => {
  if (!address) return "";
  const { line1, line2, city, state, postalCode } = address;
  let addressLine = "";
  if (line1) addressLine += `${line1}, `;
  if (line2) addressLine += `${line2}, `;
  if (city) addressLine += `${city}, `;
  stateIsTerritory(state)
    ? (addressLine += "in the ")
    : (addressLine += "in the State of ");
  if (state) addressLine += `${state}, `;
  if (postalCode) addressLine += `${postalCode}`;
  return addressLine.trim();
};

export const getStateOrTerritoryText = (state?: string) => {
  if (!state) return "";
  return stateIsTerritory(state)
    ? `in the ${state}`
    : `in the State of ${state}`;
};

export const getIntroNameAndAddress = (will: Will) => {
  return `${getWillOwnerName(will)} of ${getAddressForStateOrTerritory(
    will.address
  )}`;
};

export const getPetType = (type: string) => {
  return type === "other" ? "pet" : type;
};
