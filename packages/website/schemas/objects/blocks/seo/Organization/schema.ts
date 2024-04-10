import { defineField, defineType } from "sanity";

export const OrganizationSeoBlock = defineType({
  title: "Organization SEO",
  name: "organizationSeoBlock",
  type: "document",
  preview: {
    select: {
      title: "url",
      media: "logo",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        subtitle: "Organization SEO",
        media,
      };
    },
  },
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Legal Name",
      name: "legalName",
      type: "string",
    }),
    defineField({
      title: "Url",
      name: "url",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Logo",
      name: "logo",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
