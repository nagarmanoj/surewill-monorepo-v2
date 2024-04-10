import { defineField, defineType } from "sanity";
import { seoSchema } from "../objects/blocks/seo/schema";

export const AboutPage = defineType({
  name: "AboutPage",
  title: "About Page",
  type: "document",
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "Side Bar",
      name: "sideBar",
    },
    {
      title: "List",
      name: "list",
    },
    {
      name: "seo",
      title: "Seo",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "About Pages",
      };
    },
  },
  fields: [
    defineField({
      title: "content",
      name: "content",
      type: "contentBlock",
      group: "content",
    }),
    defineField({
      title: "Side Bar",
      name: "sideBar",
      type: "listBlock",
      group: "sideBar",
    }),
    defineField({
      title: "List",
      name: "list",
      type: "array",
      group: "list",
      of: [
        {
          type: "bulletCardBlock",
        },
      ],
    }),
    seoSchema,
  ],
});
