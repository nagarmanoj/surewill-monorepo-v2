import { defineField, defineType } from "sanity";
import { seoSchema } from "../objects/blocks/seo/schema";

export const ContactPage = defineType({
  name: "ContactPage",
  title: "Contact Pages",
  type: "document",
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      title: "Check Our FAQ",
      name: "checkOurFaq",
    },
    {
      title: "Social",
      name: "social",
    },
    {
      name: "seo",
      title: "Seo",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Pages",
      };
    },
  },
  fields: [
    defineField({
      title: "Content",
      name: "content",
      type: "contentBlock",
      group: "content",
    }),
    defineField({
      title: "Have you ever check our FAQ",
      name: "checkFaqFirst",
      type: "contentBlock",
      group: "checkOurFaq",
    }),
    defineField({
      title: "Our Social media 2",
      name: "social",
      type: "listBlock",
      group: "social",
    }),
    seoSchema,
  ],
});
