import { defineField, defineType } from "sanity";

export const socialFields = defineType({
  title: "Social",
  name: "socialFields",
  type: "object",
  fields: [
    defineField({
      name: "facebook",
      type: "url",
      title: "Facebook URL",
    }),
    defineField({
      name: "instagram",
      type: "url",
      title: "Instagram URL",
    }),
    defineField({
      name: "youtube",
      type: "url",
      title: "YouTube URL",
    }),
  ],
});
