import { defineField, defineType } from "sanity";

export const externalLink = defineType({
  title: "External Link",
  name: "externalLink",
  type: "object",
  hidden: true,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      type: "url",
      title: "URL",
    }),
    defineField({
      title: "Open in new tab",
      name: "targetBlank",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
