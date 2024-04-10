import { defineField, defineType } from "sanity";

export const pricingCardBlock = defineType({
  title: "Pricing Card",
  name: "pricingCard",
  type: "document",
  fields: [
    defineField({
      title: "title",
      name: "title",
      type: "string"
    }),
    defineField({
      title: "Price",
      name: "number",
      type: "number",
    }),
    defineField({
      title: "currency",
      name: "currency",
      type: "string"
    }),
    defineField({
      title: "description",
      name: "description",
      type: "string"
    }),
    defineField({
      title: "image",
      name: "image",
      type: "image",
      fields: [{
        type: "string",
        name: "alt"
      }]
    }),
    defineField({
      title: "CTA",
      name: "cta",
      type: "link",
    })
  ],
});
