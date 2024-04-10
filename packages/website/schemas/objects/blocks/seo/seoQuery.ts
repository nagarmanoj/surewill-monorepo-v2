export const SeoListQuery = `
  seo [] {
    _type == 'seoBlock' => @ {
      _type,
      title,
      description,
      url,
      image {
        "url": asset->url,
        "size": asset->size,
        "type": asset->mimeType,
      }
    },
    _type == 'articleSeoBlock' => @ {
      _type,
      title,
      description,
      url,
      image {
        "url": asset->url,
        "size": asset->size,
        "type": asset->mimeType,
      },
      authorName,
      datePublished,
    },
    _type == 'organizationSeoBlock' => @ {
      _type,
      name,
      legalName,
      url,
      "logo": logo.asset->url
    },
    _type == 'productSeoBlock' => @ {
      _type,
      productName,
      description,
      image [] {
        "url": asset->url
      },
      offers {
        price,
        priceCurrency,
        availability,
        seller {
          name
        }
      },
      reviews [] {
        author,
        datePublished,
        name,
        reviewBody,
        reviewRating {
          bestRating,
          ratingValue,
          worstRating,
        },
        publisher {
          type,
          name
        }
      },
      aggregateRating {
        ratingValue,
        reviewCount
      }
    },
    _type == 'localBusinessSeoBlock' => @ {
      _type,
      url,
      name,
      description,
      telephone,
      type,
      image [] {
        "url": asset->url
      },
      address {
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry
      },
      geo {
        latitude,
        longitude
      },
      servesCuisine,
      priceRange,
      menu,
      acceptsReservations,
      openingHoursSpecification [] {
        dayOfWeek,
        opens,
        closes
      }
    }
  }
`;
