import type { AddressSchema } from "~/utils/addresses";

const GOOGLE_ADDRESS_CONFIG = {
  streetNumber: ["street_number"],
  street: ["street_address", "route"],
  state: [
    "administrative_area_level_1",
    "administrative_area_level_2",
    "administrative_area_level_3",
    "administrative_area_level_4",
    "administrative_area_level_5",
  ],
  city: [
    "locality",
    "sublocality",
    "sublocality_level_1",
    "sublocality_level_2",
    "sublocality_level_3",
    "sublocality_level_4",
  ],
  postalCode: ["postal_code"],
  country: ["country"],
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export const formatAddressComponents = (
  addressComponents: Array<AddressComponent>,
  name: string
): AddressSchema => {
  let address = {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  };
  addressComponents.forEach((component) => {
    for (let key in GOOGLE_ADDRESS_CONFIG) {
      if (
        GOOGLE_ADDRESS_CONFIG[
          key as keyof typeof GOOGLE_ADDRESS_CONFIG
        ].indexOf(component.types[0]) !== -1
      ) {
        address[key as keyof typeof address] = component.long_name;
      }
    }
    if (name) {
      address.line1 = name;
    }
  });
  return address;
};
