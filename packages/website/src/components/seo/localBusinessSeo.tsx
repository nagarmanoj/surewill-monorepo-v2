import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { LocalBusinessJsonLd } from "next-seo";

export const LocalBusinessSeo = (
  data: typeof blocksValidation.seoLocalBusinessBlockValidation._type
) => {
  console.log("data", data);
  return (
    <div>
      <LocalBusinessJsonLd
        useAppDir={true}
        name={data.name}
        description={data.description}
        telephone={data.telephone || undefined}
        type={data.type}
        id={data.url || ""}
        images={data.image.map((image) => image.url)}
        address={data.address}
        url={data.url || undefined}
        geo={data.geo}
        servesCuisine={data.servesCuisine || undefined}
        priceRange={data.priceRange || undefined}
        openingHoursSpecification={data.openingHoursSpecification}
        menu={data.menu}
        acceptsReservations={data.acceptsReservations}
      />
    </div>
  );
};
