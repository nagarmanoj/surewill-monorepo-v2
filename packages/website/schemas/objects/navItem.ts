import { defineField, defineType } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "text",
      type: "string",
      title: "Navigation Text",
    }),
    defineField({
      name: "navigationItemUrl",
      type: "link",
      title: "Navigation Item URL",
    }),
  ],
});
