import { defineField, defineType } from "sanity";

export const meta = defineType({
  name: "meta",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      rows: 3,
      validation: (Rule) => [
        Rule.max(180).warning("Description should be less than 180 characters"),
        Rule.min(120).warning("Description should be at least 120 characters"),
      ],
    }),
  ],
});
