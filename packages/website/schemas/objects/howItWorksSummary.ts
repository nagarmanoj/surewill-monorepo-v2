import { defineField, defineType } from "sanity";

export const howItWorksSummary = defineType({
  name: "howItWorksSummary",
  title: "How It Works Summary",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "reasonsWhy",
      title: "Reasons Why",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "list",
          title: "List",
          type: "array",
          of: [{
            type: "object",
            title: "reason why list",
            name: 'reasonWhyList',
            fields: [
              defineField({
                name: "title",
                title: "Title",
                type: "string",
              }),
              defineField({
                name: "icon",
                title: "Icon",
                type: "image",
                options: {
                  hotspot: true,
                },
                fields: [
                  defineField({
                    name: "alt",
                    title: "Alt",
                    type: "string",
                  }),
                ],
              })
            ]
          }],
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "howItWorksStep" }],
    }),
  ],
});
