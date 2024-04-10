import { defineField, defineType } from "sanity";

export const emailSubscriptionBanner = defineType({
  title: "Email Subscription Banner",
  name: "emailSubscriptionBanner",
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
      type: "text",
      rows: 2,
    }),
    defineField({
      title: "Input Placeholder",
      name: "inputPlaceholder",
      type: "string",
    }),
    defineField({
      title: "Submit Button Text",
      name: "buttonText",
      type: "string",
    }),
  ],
});
