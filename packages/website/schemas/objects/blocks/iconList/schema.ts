import { defineField, defineType } from "sanity";

export const IconListBlock = defineType({
  title: "Icon List",
  name: "iconListBlock",
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
              ],
            }),
            defineField({
              title: "url",
              name: "url",
              type: "url",
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
