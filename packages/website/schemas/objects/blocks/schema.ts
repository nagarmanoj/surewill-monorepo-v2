import { contentBlock } from "./content/schema";
import { listBlock } from "./list/schema";
import { IconListBlock } from "./iconList/schema";
import { linkBlock } from "./link/schema";
import { faqBlock } from "./faq/schema";
import { faqGroupItem } from "./faqGroupItem/schema";
import { blogBlock } from "./blog/schema";
import { bulletCardBlock } from "./bulletCard/schema";
import { pricingCardBlock } from "./pricingCard/schema";
import { TestimonialBlock } from "./testimonial/schema";
import { pageBlock } from "./page/schema";
import { seoListSchema } from "./seo/seoSchema";

export const blocksSchema = [
  linkBlock,
  listBlock,
  contentBlock,
  faqBlock,
  faqGroupItem,
  blogBlock,
  bulletCardBlock,
  pricingCardBlock,
  TestimonialBlock,
  pageBlock,
  IconListBlock,
  ...seoListSchema,
];
