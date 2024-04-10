import { defineField, defineType } from "sanity";
import { seoSchema } from "../objects/blocks/seo/schema";

export const CreateWillPages = defineType({
  name: "CreateWillPages",
  title: "Create Will Pages",
  type: "document",
  description: "Create Will Pages",
  groups: [
    {
      name: "seo",
      title: "Seo",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Create Will Pages",
      };
    },
  },
  fields: [
    defineField({
      name: "Introduction",
      title: "introduction",
      type: "object",
      fields: [
        defineField({
          title: "Create Will Intro Content",
          name: "createWillIntro",
          type: "contentBlock",
        }),
        defineField({
          title: "Why do I need a will",
          name: "whyDoINeedWill",
          type: "listBlock",
        }),
      ],
    }),
    defineField({
      title: "Isn’t it too much hassle?",
      name: "IsnotItTooMuchHassle",
      type: "object",
      fields: [
        defineField({
          title: "Intro",
          name: "intro",
          type: "contentBlock",
        }),
        defineField({
          title: "Why SureWill",
          name: "whySureWill",
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
      title: "What’s included in my Surewill pack?",
      name: "WhatIsIncludedInMySurewillPack",
      type: "object",
      fields: [
        defineField({
          title: "Hero Image",
          name: "heroImage",
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
            },
          ],
        }),
        defineField({
          title: "content",
          name: "content",
          type: "contentBlock",
        }),
        defineField({
          title: "Include",
          name: "include",
          type: "listBlock",
        }),
      ],
    }),
    seoSchema,
  ],
});
