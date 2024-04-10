import { defineField, defineType } from "sanity";

export const ProductSeoBlock = defineType({
  title: "Product SEO",
  name: "productSeoBlock",
  type: "document",
  preview: {
    select: {
      title: "productName",
      media: "image.[0]",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        subtitle: "Product SEO",
        media,
      };
    },
  },
  fields: [
    defineField({
      title: "Product Name",
      name: "productName",
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
      title: "Brand",
      name: "brand",
      type: "string",
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
      title: "Offers",
      name: "offers",
      type: "object",
      fields: [
        defineField({
          title: "Price",
          name: "price",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Price Currency",
          name: "priceCurrency",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Availability",
          name: "availability",
          type: "string",
          options: {
            list: [
              { title: "Back Order", value: "https://schema.org/BackOrder" },
              { title: "In Stock", value: "https://schema.org/InStock" },
              { title: "Out Of Stock", value: "https://schema.org/OutOfStock" },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: "Seller",
          name: "seller",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              title: "Name",
              name: "name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        defineField({
          title: "Review",
          name: "review",
          type: "object",
          fields: [
            defineField({
              name: "author",
              title: "author",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "datePublished",
              title: "datePublished",
              type: "datetime",
              validation: (Rule) => Rule.required(),
              options: {
                dateFormat: "YYYY-MM-DD",
                timeFormat: "HH:mm",
                timeStep: 15,
              },
            }),
            defineField({
              name: "name",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reviewBody",
              title: "reviewBody",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: "Review Rating",
              name: "reviewRating",
              type: "object",
              fields: [
                defineField({
                  title: "Best Rating",
                  name: "bestRating",
                  type: "number",
                  initialValue: 5,
                  validation: (Rule) => Rule.min(0).max(5).required(),
                }),
                defineField({
                  title: "Rating Value",
                  name: "ratingValue",
                  type: "number",
                  validation: (Rule) => Rule.min(0).max(5).required(),
                }),
                defineField({
                  title: "Worst Rating",
                  name: "worstRating",
                  type: "number",
                  initialValue: 0,
                  validation: (Rule) => Rule.min(0).max(5).required(),
                }),
              ],
            }),
            defineField({
              title: "Publisher",
              name: "publisher",
              type: "object",
              fields: [
                defineField({
                  name: "type",
                  description:
                    'please read google document about publisher type (recommend using "Organization")',
                  title: "type",
                  type: "string",
                  initialValue: "Organization",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "name",
                  title: "name",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      title: "Aggregate Rating",
      name: "aggregateRating",
      type: "object",
      fields: [
        defineField({
          title: "Rating Value",
          name: "ratingValue",
          type: "number",
          validation: (Rule) => Rule.min(0).max(5).required(),
        }),
        defineField({
          title: "Review Count",
          name: "reviewCount",
          type: "number",
          validation: (Rule) => Rule.min(0).max(5).required(),
        }),
      ],
    }),
  ],
});
