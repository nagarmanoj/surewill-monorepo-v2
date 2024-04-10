import { defineField, defineType } from "sanity";
import { seoSchema } from "../objects/blocks/seo/schema";

export const howItWorksPage = defineType({
  name: "howItWorksPage",
  title: "How It Works Page",
  type: "document",
  groups: [
    {
      title: "Section 1",
      name: "section1",
      default: true,
    },
    {
      title: "Section 2",
      name: "section2",
    },
    {
      title: "Section 3",
      name: "section3",
    },
    {
      name: "seo",
      title: "Seo",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "How It Work Pages",
      };
    },
  },
  fields: [
    defineField({
      title: "Why Surewill",
      name: "whySurewill",
      type: "object",
      group: "section1",
      fields: [
        defineField({
          title: "content",
          name: "content",
          type: "contentBlock",
        }),
        defineField({
          title: "why List",
          name: "whyList",
          type: "listBlock",
        }),
        defineField({
          title: "Bullet List",
          name: "bulletList",
          type: "array",
          of: [
            {
              type: "bulletCardBlock",
            },
          ],
        }),
      ],
    }),
    defineField({
      title: "Itn't a big job",
      name: "itNotABigJob",
      type: "object",
      group: "section2",
      fields: [
        defineField({
          title: "content",
          name: "content",
          type: "contentBlock",
        }),
        defineField({
          title: "Check List",
          name: "checkList",
          type: "listBlock",
        }),
        defineField({
          title: "Hero Image",
          name: "heroImage",
          type: "image",
          fields: [
            {
              type: "string",
              name: "alt",
            },
          ],
        }),
      ],
    }),
    defineField({
      title: "What I get",
      name: "whatIGet",
      type: "object",
      group: "section3",
      fields: [
        defineField({
          title: "content",
          name: "content",
          type: "contentBlock",
        }),
        defineField({
          title: "What Include",
          name: "whatInclude",
          type: "listBlock",
        }),
        defineField({
          title: "Hero Image",
          name: "heroImage",
          type: "image",
          fields: [
            {
              type: "string",
              name: "alt",
            },
          ],
        }),
      ],
    }),
    seoSchema,
  ],
});
