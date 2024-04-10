import { defineField, defineType } from "sanity";

export const footerMenu = defineType({
  title: "Footer Menu",
  name: "footerMenu",
  type: "document",
  groups: [
    {
      title: "Intro Column",
      name: "introColumn",
      default: true
    },
    {
      title: "Menus Column",
      name: "menusColumn"
    },
    {
      title: "Payment Column",
      name: "paymentColumn"
    },
  ],
  fields: [
    defineField({
      title: "introColumn",
      name: "introColumn",
      type: "object",
      group: "introColumn",
      fields: [
        defineField({
          name: "logo",
          title: "logo ",
          type: "image",
          fields: [
            {
              type: "string",
              name: "alt"
            },
            {
              type: "number",
              name: "maxWidth"
            }
          ]
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "socials",
          title: "Socialss List",
          type: "array",
          of: [
            defineField({
              name: "social",
              title: "Social ",
              type: "image",
              fields: [
                defineField({
                  type: "string",
                  name: "alt"
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
              ]
            }),
          ]
        }),
      ]
    }),
    defineField({
      title: "Menu Column",
      name: "menuColumn",
      type: "object",
      group: "menusColumn",
      fields: [
        defineField({
          name: "firstMenus",
          title: "First Menu",
          type: "array",
          of: [
            defineField({
              title: "Menu",
              name: "menu",
              type: "link"
            })
          ]
        }),
        defineField({
          name: "secondMenus",
          title: "Second Menu",
          type: "array",
          of: [
            defineField({
              title: "Menu",
              name: "menu",
              type: "link"
            })
          ]
        })
      ]
    }),
    defineField({
      title: "Payment",
      name: "paymentColumn",
      type: "object",
      group: "paymentColumn",
      fields: [
        defineField({
          title: "Title",
          name: "title",
          type: "string"
        }),
        defineField({
          name: "payments",
          title: "Payment List",
          type: "array",
          of: [
            defineField({
              name: "payment",
              title: "Payment ",
              type: "image",
              fields: [
                {
                  type: "string",
                  name: "alt"
                }
              ]
            })
          ]
        }),
      ]
    })
  ],
});
