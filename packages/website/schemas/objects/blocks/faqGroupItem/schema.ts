import { defineField, defineType } from "sanity";

export const faqGroupItem = defineType({
  title: "FAQ Group",
  name: "faqGroup",
  type: "document",
  preview: {
    select: {
      title: "faqGroupName",
    },
  },
  fields: [
    defineField({
      title: "ID",
      name: "id",
      type: "string",
      description: "html id attribute",
    }),
    defineField({
      title: "FAQ group name",
      name: "faqGroupName",
      type: "string",
    }),
    defineField({
      title: "FAQ List",
      name: "faqList",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "faq" }],
          // ✨ Sanity Studio magically displays a list of active products from the PIM via API integration ✨
        },
      ],
    }),
  ],
});
