import type { ReactNode } from "react";
import { WillCreationType } from "@prisma/client";
import { routes } from "~/config/routes";
import { SingleWillImage } from "./images/SingleWill";
import { RelationshipWillImage } from "./images/RelationshipWill";
import { FamilyWillImage } from "./images/FamilyWill";
import { CustomWillImage } from "./images/CustomWill";

type WillConfig = {
  willType: WillCreationType;
  title: string;
  description: string;
  image?: ReactNode;
};

export const WILL_TYPES_CONFIG: WillConfig[] = [
  {
    willType: "SINGLE",
    title: "Single",
    description:
      "I'm single with no kids. I want one or more people to receive my assets.",
    image: <SingleWillImage className="z-10 mb-4" />,
  },
  {
    willType: "RELATIONSHIP",
    title: "Relationship",
    description:
      "I'm in a relationship, with no kids. I want my partner to receive all of my assets.",
    image: <RelationshipWillImage className="z-10 mb-4" />,
  },
  {
    willType: "FAMILY",
    title: "Family",
    description:
      "I'm in a relationship and have kids. I want my partner to receive all my assets, thereafter my kids in equal shares.",
    image: <FamilyWillImage className="z-10 mb-4" />,
  },
  {
    willType: "CUSTOM",
    title: "Customised",
    description: "I'd like to divide my assets up a little differently.",
    image: <CustomWillImage className="z-10 mb-4" />,
  },
];

export const CONTINUE_WILL_URLS: { [key in WillCreationType]: string } = {
  SINGLE: routes.dashboard.willSingle,
  RELATIONSHIP: routes.dashboard.willRelationship,
  FAMILY: routes.dashboard.willFamily,
  CUSTOM: routes.dashboard.willCustom,
};
