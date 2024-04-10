import { defineField, defineType } from "sanity";

export const listBlock = defineType({
  title: "List",
  name: "listBlock",
  type: "document",
  fields: [
    defineField({
      title: "title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "description",
      name: "description",
      type: "string",
    }),
    defineField({
      title: "List",
      name: "list",
      type: "array",
      of: [
        defineField({
          title: "List Item",
          name: "listItem",
          type: "object",
          fields: [
            defineField({
              title: "icon",
              name: "icon",
              type: "image",
              fields: [
                {
                  type: "string",
                  name: "alt",
                },
                {
                  title: "url",
                  name: "url",
                  type: "url",
                },
              ],
            }),
            defineField({
              title: "text",
              name: "listText",
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
          ],
        }),
      ],
    }),
    defineField({
      title: "CTA",
      name: "cta",
      type: "link",
    }),
  ],
});
