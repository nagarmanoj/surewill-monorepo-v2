import { defineField, defineType } from "sanity";
import { seoSchema } from "../objects/blocks/seo/schema";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      name: "seo",
      title: "Seo",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Home Pages",
      };
    },
  },
  fields: [
    defineField({
      title: "Intro",
      name: "intro",
      type: "object",
      group: "content",
      fields: [
        defineField({
          title: "content",
          name: "content",
          type: "contentBlock",
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt",
              type: "string",
            }),
            defineField({
              title: "URL",
              name: "href",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ["https", "http", "mailto", "tel", "/"],
                }),
            }),
          ],
        }),
      ],
    }),
    defineField({
      title: "Why Surewill",
      name: "whySurewill",
      type: "object",
      group: "content",
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
      title: "Price Section",
      name: "price",
      type: "object",
      group: "content",
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
      ],
    }),
    defineField({
      name: "readyToStart",
      title: "Ready To Start",
      type: "object",
      group: "content",
      fields: [
        defineField({
          title: "content",
          name: "content",
          type: "contentBlock",
        }),
        defineField({
          title: "FAQ",
          name: "faqSection",
          type: "object",
          fields: [
            defineField({
              title: "FaqList",
              name: "faqList",
              type: "array",
              of: [
                defineField({
                  title: "Faq List",
                  name: "faqList",
                  type: "reference",
                  to: [{ type: "faq" }],
                }),
              ],
            }),
            defineField({
              title: "CTA",
              name: "cta",
              type: "link",
            }),
          ],
        }),
        defineField({
          title: "Testimonial Section",
          name: "testimonialSection",
          type: "object",
          fields: [
            defineField({
              title: "Logo",
              name: "logo",
              type: "image",
              fields: [
                {
                  name: "alt",
                  type: "string",
                },
              ],
            }),
            defineField({
              title: "title",
              name: "title",
              type: "string",
            }),
            defineField({
              title: "Testimonial",
              name: "testimonialref",
              type: "reference",
              to: [{ type: "testimonial" }],
            }),
            defineField({
              title: "CTA",
              name: "cta",
              type: "link",
            }),
          ],
        }),
      ],
    }),
    seoSchema,
  ],
});
