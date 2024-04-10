import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { ProductJsonLd } from "next-seo";

export const ProductSeo = (
  data: typeof blocksValidation.seoProductBlockValidation._type
) => {
  return (
    <ProductJsonLd
      useAppDir={true}
      productName={data.productName}
      description={data.description}
      brand={data.brand || undefined}
      images={data?.image?.map((image) => image.url)}
      offers={
        data.offers
          ? {
              price: data.offers.price,
              priceCurrency: data.offers.priceCurrency,
              availability: data.offers.availability,
              seller: {
                name: data.offers?.seller?.name,
              },
            }
          : undefined
      }
      reviews={
        data?.reviews
          ? data?.reviews?.map((review) => ({
              author: review.author,
              datePublished: review.datePublished,
              reviewBody: review.reviewBody,
              name: review.name,
              reviewRating: {
                bestRating: review?.reviewRating?.bestRating,
                ratingValue: review?.reviewRating?.ratingValue,
                worstRating: review?.reviewRating?.worstRating,
              },
              publisher: {
                type: review?.publisher?.type,
                name: review?.publisher?.name,
              },
            }))
          : undefined
      }
      aggregateRating={
        data?.aggregateRating
          ? {
              ratingValue: data?.aggregateRating?.ratingValue,
              reviewCount: data?.aggregateRating?.reviewCount,
            }
          : undefined
      }
    />
  );
};
