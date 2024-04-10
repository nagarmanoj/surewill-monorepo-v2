import { defineField, defineType } from "sanity";

export const howItWorksStep = defineType({
  name: "howItWorksStep",
  title: "How It Works Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "URL",
          type: "url",
        }),
      ],
    }),
  ],
});
