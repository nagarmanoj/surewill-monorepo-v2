import { WillCreationType } from "@prisma/client";
import { routes } from "~/config/routes";

const checkoutUrls: { [key in WillCreationType]: string } = {
  ["SINGLE"]: routes.dashboard.billing.checkoutSingle,
  ["RELATIONSHIP"]: routes.dashboard.billing.checkoutRelationship,
  ["FAMILY"]: routes.dashboard.billing.checkoutFamily,
  ["CUSTOM"]: routes.dashboard.billing.checkoutCustom,
};

export const getCheckoutUrl = (willType: WillCreationType) => {
  return checkoutUrls[willType];
};
