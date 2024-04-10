import { defineField, defineType } from "sanity";
import { LinkEnum, buttonVaraintEnum } from "./enum";

export const linkBlock = defineType({
  title: "URL",
  name: "link",
  type: "document",
  // hidden: true,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "URL",
      name: "href",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["https", "http", "mailto", "tel", "/", "#"],
        }),
    }),
    defineField({
      title: "Target",
      name: "target",
      type: "string",
      options: {
        list: LinkEnum,
      },
      initialValue: "_self",
    }),
    defineField({
      title: "Button Varaint",
      name: "buttonVaraint",
      type: "string",
      options: {
        list: buttonVaraintEnum,
      },
      initialValue: "primary",
    }),
    defineField({
      title: "id",
      name: "id",
      type: "string",
      description: "html id (optional)",
    }),
  ],
});
