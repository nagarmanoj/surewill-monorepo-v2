import { emailSubscriptionBanner } from "./documents/emailSubscription";
import { mainMenu } from "./documents/mainMenuSection";
import { footerMenu } from "./documents/footerMenu";
import { externalLink } from "./objects/externalLink";
import { blocksSchema } from "./objects/blocks/schema";
import { homePage } from "./pages/home";
import { ContactPage } from "./pages/contact";
import { AboutPage } from "./pages/about";
import { FAQPage } from "./pages/faq";
import { howItWorksPage } from "./pages/how-it-works";
import { howItWorksStep } from "./objects/howItWorksStep";
import { howItWorksSummary } from "./objects/howItWorksSummary";
import { internalLink } from "./objects/internalLink";
import { meta } from "./objects/meta";
import { navItem } from "./objects/navItem";
import { pricing } from "./objects/pricing";
import { pricingOptionsSummary } from "./objects/pricingOptionsSummary";
import { pricingPage } from "./pages/pricing";
import { siteSettings } from "./documents/siteSettings";
import { socialFields } from "./objects/social";
import { StartYourWillBanner } from "./documents/startYourWill";
import { CreateWillPages } from "./pages/create-will";
import { BlogPages } from "./pages/blog";

export const schemaTypes = [
  // pages,
  homePage,
  howItWorksPage,
  FAQPage,
  CreateWillPages,
  BlogPages,
  ContactPage,
  AboutPage,
  // component
  ...blocksSchema,
  mainMenu,
  footerMenu,
  emailSubscriptionBanner,
  externalLink,
  howItWorksStep,
  howItWorksSummary,
  internalLink,
  meta,
  navItem,
  pricing,
  pricingOptionsSummary,
  pricingPage,
  siteSettings,
  socialFields,
  StartYourWillBanner,
];
