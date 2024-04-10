import { defineField, defineType } from "sanity";

// useAppDir={true}
// images={pageData?.image?.url ? [pageData.image.url] : []}
// title={pageData?.title}
// description={pageData?.subTitle || ""}
// url={`${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}/blog/${params.slug}`}
// datePublished={pageData._createdAt}
// authorName="Sure Will Admin"

export const ArticleSeoBlock = defineType({
  title: "Article SEO",
  name: "articleSeoBlock",
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
        subtitle: "Article SEO",
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
    defineField({
      title: "Author Name",
      name: "authorName",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Published Date",
      name: "datePublished",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
