import { OrganizationSeoBlock } from "./Organization/schema";
import { LocalBusinessSeoBlock } from "./localBusiness/schema";
import { ProductSeoBlock } from "./product/schema";
import { SeoBlock } from "./basic/schema";
import { ArticleSeoBlock } from "./article/schema";

export const seoListSchema = [
  OrganizationSeoBlock,
  SeoBlock,
  LocalBusinessSeoBlock,
  ProductSeoBlock,
  ArticleSeoBlock,
];
