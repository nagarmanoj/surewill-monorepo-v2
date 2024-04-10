import { defineField, defineType } from "sanity";

const TimeList = [
  "06.00",
  "06.30",
  "07.00",
  "07.30",
  "08.00",
  "08.30",
  "09.00",
  "09.30",
  "10.00",
  "10.30",
  "11.00",
  "11.30",
  "12.00",
  "12.30",
  "13.00",
  "13.30",
  "14.00",
  "14.30",
  "15.00",
  "15.30",
  "16.00",
  "16.30",
  "17.00",
  "17.30",
  "18.00",
  "18.30",
  "19.00",
  "19.30",
  "20.00",
  "20.30",
  "21.00",
  "21.30",
  "22.00",
  "22.30",
  "23.00",
  "23.30",
  "00.00",
  "00.30",
  "01.00",
  "01.30",
  "02.00",
  "02.30",
  "03.00",
  "03.30",
  "04.00",
  "04.30",
  "05.00",
  "05.30",
];

export const LocalBusinessSeoBlock = defineType({
  title: "Local Business SEO",
  name: "localBusinessSeoBlock",
  type: "document",
  preview: {
    select: {
      title: "name",
      media: "image.[0]",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        subtitle: "Local Business SEO",
        media,
      };
    },
  },
  fields: [
    defineField({
      title: "Url",
      name: "url",
      type: "url",
    }),
    defineField({
      title: "Name",
      name: "name",
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
      title: "Telephone",
      name: "telephone",
      type: "string",
    }),
    defineField({
      title: "Type",
      name: "type",
      type: "string",
      description:
        "See list of business here https://www.propellic.com/blog/google-my-business-categorie",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Image List",
      name: "image",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
    }),
    defineField({
      title: "Address",
      name: "address",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          title: "Street Address",
          name: "streetAddress",
          type: "string",
        }),
        defineField({
          title: "Address Locality",
          name: "addressLocality",
          type: "string",
        }),
        defineField({
          title: "Address Region",
          name: "addressRegion",
          type: "string",
        }),
        defineField({
          title: "Postal Code",
          name: "postalCode",
          type: "string",
        }),
        defineField({
          title: "Address Country",
          name: "addressCountry",
          type: "string",
        }),
      ],
    }),
    defineField({
      title: "Geo Location",
      name: "geo",
      type: "object",
      fields: [
        defineField({
          title: "Latitude",
          name: "latitude",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Longitude",
          name: "longitude",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Serves Cuisine",
      name: "servesCuisine",
      type: "string",
    }),
    defineField({
      title: "Price Range",
      name: "priceRange",
      type: "string",
    }),
    defineField({
      title: "Menu Url",
      name: "menu",
      type: "url",
    }),
    defineField({
      title: "Accepts Reservations",
      name: "acceptsReservations",
      type: "boolean",
    }),
    defineField({
      title: "Opening Hours Specification",
      name: "openingHoursSpecification",
      type: "array",
      of: [
        defineField({
          title: "openingHour",
          name: "openingHour",
          type: "object",
          preview: {
            select: {
              dayOfWeek: "dayOfWeek",
              opens: "opens",
              closes: "closes",
            },
            prepare: ({ closes, dayOfWeek, opens }) => {
              return {
                title: (dayOfWeek as string[]).join(" / "),
                subtitle: `${opens} - ${closes}`,
              };
            },
          },
          fields: [
            defineField({
              title: "dayOfWeek",
              type: "array",
              name: "dayOfWeek",
              of: [
                defineField({
                  name: "day",
                  type: "string",
                  options: {
                    list: [
                      { title: "Monday", value: "Monday" },
                      { title: "Tuesday", value: "Tuesday" },
                      { title: "Wednesday", value: "Wednesday" },
                      { title: "Thursday", value: "Thursday" },
                      { title: "Friday", value: "Friday" },
                      { title: "Saturday", value: "Saturday" },
                      { title: "Sunday", value: "Sunday" },
                    ],
                  },
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "opens",
              type: "string",
              options: {
                list: TimeList.map((time) => ({ title: time, value: time })),
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "closes",
              type: "string",
              options: {
                list: TimeList.map((time) => ({ title: time, value: time })),
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
