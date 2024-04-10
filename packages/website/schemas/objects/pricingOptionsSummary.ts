import { defineField, defineType } from "sanity";

export const pricingOptionsSummary = defineType({
  name: "pricingOptions",
  title: "Pricing Options",
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
      name: "paymentOptionsList",
      title: "Payment Options",
      type: "array",
      of: [
        {
          name: "logo",
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alt",
              type: "string",
            }),
          ]
        }
      ]
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "link",
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "array",
      of: [
        {
          type: "pricing",
        },
      ],
    }),
  ],
});
