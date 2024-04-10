import { defineField, defineType } from "sanity";
import { LinkEnum } from "../link/enum";

export const bulletCardBlock = defineType({
  title: "Bullet",
  name: "bulletCardBlock",
  type: "document",
  fields: [
    defineField({
      title: "title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Number",
      name: "number",
      type: "number",
    }),
    defineField({
      title: "image",
      name: "image",
      type: "image",
      fields: [
        {
          type: "string",
          name: "alt",
        },
      ],
    }),
    defineField({
      title: "Body",
      name: "body",
      type: "array",
      of: [
        defineField({
          type: "block",
          name: "block",
          lists: [],
          styles: [],
          marks: {
            decorators: [],
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
      ],
    }),
    defineField({
      title: "CTA",
      name: "cta",
      type: "link",
    }),
  ],
});
