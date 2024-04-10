import { contentBlockValidation } from "./content/validation";
import { listBlockValidation } from "./list/validation";
import { linkValidation } from "./link/validation";
import { faqBlockValidation } from "./faq/validation";
import { faqGroupItemBlockValidation } from "./faqGroupItem/validation";
import { blogBlockValidation } from "./blog/validation";
import * as seoValidation from "./seo/seoValidation";
import { bulletCardBlockValidation } from "./bulletCard/validation";
import { pricingCardBlockValidation } from "./pricingCard/validation";
import { TestimonialBlockValidation } from "./testimonial/validation";
import { pageBlockValidation } from "./page/validation";

export const blocksValidation = {
  linkValidation,
  contentBlockValidation,
  listBlockValidation,
  faqBlockValidation,
  faqGroupItemBlockValidation,
  blogBlockValidation,
  bulletCardBlockValidation,
  pricingCardBlockValidation,
  TestimonialBlockValidation,
  pageBlockValidation,
  ...seoValidation,
};
