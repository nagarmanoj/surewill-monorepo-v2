import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "meta",
      title: "SEO",
      type: "meta",
    }),
    defineField({
      name: "socialFields",
      title: "Social",
      type: "socialFields",
    }),
    defineField({
      name: "copyrightNotice",
      title: "Copyright Notice",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "adminEmailList",
      title: "Admin Email List",
      description:
        "this email list is use for recive contact from contact form",
      type: "array",
      of: [
        {
          type: "email",
          name: "email",
        },
      ],
    }),
  ],
});
