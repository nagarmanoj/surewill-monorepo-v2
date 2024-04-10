import { defineField, defineType } from "sanity";

export const mainMenu = defineType({
  title: "Main Menu",
  name: "mainMenu",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string"
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "menus",
      title: "Menu",
      type: "array",
      of: [
        defineField({
          title: "Menu",
          name: "menu",
          type: "link"
        })
      ]
    })
  ],
});
