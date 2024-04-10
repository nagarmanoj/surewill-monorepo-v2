import { defineField } from "sanity";

export const seoSchema = defineField({
  title: "Seo",
  name: "seo",
  type: "array",
  of: [
    { type: "seoBlock" },
    { type: "organizationSeoBlock" },
    { type: "localBusinessSeoBlock" },
    { type: "productSeoBlock" },
    { type: "articleSeoBlock" },
  ],
  group: "seo",
});
