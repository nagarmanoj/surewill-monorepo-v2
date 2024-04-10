import { defineField, defineType } from "sanity";
import { seoSchema } from "../objects/blocks/seo/schema";

export const FAQPage = defineType({
  name: "FAQPage",
  title: "How It Works Page",
  type: "document",
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "faq",
      title: "Faq",
    },
    {
      name: "seo",
      title: "Seo",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "FAQ Pages",
      };
    },
  },
  fields: [
    defineField({
      name: "Introduction",
      title: "introduction",
      type: "object",
      fields: [
        defineField({
          title: "FAQ Intro Content",
          name: "faqIntroContent",
          type: "contentBlock",
        }),
        defineField({
          title: "What can we help with?",
          name: "whatCanWeHelpWith",
          type: "listBlock",
        }),
      ],
      group: "content",
    }),
    defineField({
      title: "FAQ Section",
      name: "faqSection",
      type: "array",
      group: "faq",
      of: [{ type: "faqGroup" }],
    }),
    seoSchema,
  ],
});
