import { defineField, defineType } from "sanity";

export const internalLink = defineType({
  title: "Internal Link",
  name: "internalLink",
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
      name: "link",
      title: "Link",
      type: "reference",
      to: [
        {
          type: "homePage",
        },
      ],
    }),
  ],
});
