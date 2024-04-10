import { defineField, defineType } from "sanity";

export const SeoBlock = defineType({
  title: "Basic SEO",
  name: "seoBlock",
  type: "document",
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        subtitle: "Basic SEO",
        media,
      };
    },
  },
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "URL",
      name: "url",
      description: "Seo page url for example /contact",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["https", "http", "/"],
        }).required(),
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
        },
      ],
    }),
  ],
});
