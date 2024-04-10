import { defineField, defineType } from "sanity";

export const faqBlock = defineType({
  title: "FAQ",
  name: "faq",
  type: "document",
  fields: [
    defineField({
      title: "Question",
      name: "question",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      title: "Answer",
      name: "answer",
      type: "string",
      validation: Rule => Rule.required()
    })
  ],
});
