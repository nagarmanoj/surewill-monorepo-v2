import { defineField, defineType } from "sanity";

export const TestimonialBlock = defineType({
  title: "Testimonial",
  name: "testimonial",
  type: "document",
  fields: [
    defineField({
      title: "name",
      name: "name",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      title: "Detail",
      name: "detail",
      type: "text",
      validation: Rule => Rule.required()
    })
  ],
});
