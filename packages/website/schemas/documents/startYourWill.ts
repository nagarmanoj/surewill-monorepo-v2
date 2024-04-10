import { defineField, defineType } from "sanity";


export const StartYourWillBanner = defineField({
  title: "Start Your Will Banner ",
  name: "startYourWillBanner",
  type: "document",
  groups: [
    {
      name: "content",
      title: "Content",
    },
  ],
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Sub Title",
      name: "subTitle",
      type: "string",
    }),
    defineField({
      title: "CTA",
      name: "cta",
      type: "link",
    })
  ]
});