import { defineField, defineType } from "sanity";
import { seoListSchema } from "../seo/seoSchema";
import { seoSchema } from "../seo/schema";

export const pageBlock = defineType({
  title: "Page",
  name: "pageBlock",
  type: "document",
  groups: [
    {
      name: "seo",
      title: "Seo",
    },
  ],
  fields: [
    defineField({
      title: "title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input.toLocaleLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Sub Title",
      name: "subTitle",
      type: "string",
    }),
    defineField({
      title: "Cover Image",
      name: "cover",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
        },
      ],
    }),
    defineField({
      title: "Body",
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            {
              type: "string",
              name: "alt",
            },
          ],
        },
      ],
    }),
    seoSchema,
  ],
});
