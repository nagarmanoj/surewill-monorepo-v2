import { defineField, defineType } from "sanity";

export const pricing = defineType({
  name: "pricing",
  title: "Pricing Option",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "price",
      type: "string",
      title: "Price",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 2,
    }),
    defineField({
      name: "heroImage",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ]
    }),
  ],
});
