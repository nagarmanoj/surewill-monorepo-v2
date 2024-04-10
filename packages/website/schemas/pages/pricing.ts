import { defineField, defineType } from "sanity";
import { seoSchema } from "../objects/blocks/seo/schema";

export const pricingPage = defineType({
  name: "pricingPage",
  title: "Pricing Page",
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
      name: "seo",
      title: "Seo",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Pricing Pages",
      };
    },
  },
  fields: [
    defineField({
      title: "Intro Section",
      name: "intro",
      type: "object",
      group: "section1",
      fields: [
        defineField({
          title: "content",
          name: "content",
          type: "contentBlock",
        }),
        defineField({
          title: "Payment List",
          name: "paymentList",
          type: "listBlock",
        }),
        defineField({
          title: "Pricing Options",
          name: "pricingOptions",
          type: "array",
          of: [
            {
              type: "pricingCard",
            },
          ],
        }),
        defineField({
          title: "Storage Plan",
          name: "storagePlan",
          type: "array",
          of: [
            defineField({
              title: "Plan",
              name: "plan",
              type: "object",
              fields: [
                defineField({
                  title: "title",
                  name: "title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  title: "Parentheses",
                  name: "parentheses",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  title: "Sub Title",
                  name: "subTitle",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  title: "Description",
                  name: "description",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      title: "What I get",
      name: "whatIGet",
      type: "object",
      group: "section2",
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
