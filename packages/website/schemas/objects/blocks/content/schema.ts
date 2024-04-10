import { defineField, defineType } from "sanity";

export const contentBlock = defineType({
  title: "Content",
  name: "contentBlock",
  type: "document",
  fields: [
    defineField({
      title: "title",
      name: "title",
      type: "string"
    }),
    defineField({
      title: "Sub Title",
      name: "subTitle",
      type: "string",
    }),
    defineField({
      title: "description",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "CTA",
      name: "cta",
      type: "link",
    })
  ],
});
