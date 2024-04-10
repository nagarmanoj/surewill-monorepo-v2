import { defineField, defineType } from "sanity";
import { seoSchema } from "../objects/blocks/seo/schema";

export const BlogPages = defineType({
  name: "BlogPages",
  title: "Blog Page",
  type: "document",
  groups: [
    {
      name: "seo",
      title: "Seo",
    },
  ],
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      description: "page title",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
        },
      ],
    }),
    defineField({
      title: "SubTitle",
      name: "subTitle",
      type: "string",
      description: "page title",
    }),
    defineField({
      title: "CTA",
      name: "cta",
      type: "link",
    }),
    seoSchema,
  ],
});
