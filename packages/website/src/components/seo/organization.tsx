import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { OrganizationJsonLd } from "next-seo";

export const OrganizationSeo = ({
  logo,
  url,
  name,
  legalName,
}: typeof blocksValidation.seoOrganizationBlockValidation._type) => {
  return (
    <div>
      <OrganizationJsonLd
        useAppDir={true}
        name={name}
        legalName={legalName || undefined}
        logo={logo}
        url={url}
      />
    </div>
  );
};
