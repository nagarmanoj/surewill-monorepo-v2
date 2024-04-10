import { defineField, defineType } from "sanity";
import { seoSchema } from "../seo/schema";
import { LinkEnum } from "../link/enum";

export const blogBlock = defineType({
  title: "Blog",
  name: "blogBlock",
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
          input
            .toLocaleLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
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
      title: "Sub Title",
      name: "subTitle",
      type: "string",
    }),
    defineField({
      title: "Description",
      name: "description",
      description:
        "I will delete this soon when you move all content to new rich text field",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Body",
      name: "body",
      type: "array",
      of: [
        defineField({
          type: "block",
          name: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    title: "Title",
                    name: "title",
                    type: "string",
                  }),
                  defineField({
                    title: "URL",
                    name: "href",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["https", "http", "mailto", "tel", "/", "#"],
                      }),
                  }),
                  defineField({
                    title: "Target",
                    name: "target",
                    type: "string",
                    options: {
                      list: LinkEnum,
                    },
                    initialValue: "_self",
                  }),
                ],
              },
            ],
          },
        }),
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
    defineField({
      title: "CTA",
      name: "cta",
      type: "link",
    }),
    seoSchema,
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subTitle",
      media: "image",
    },
  },
});
