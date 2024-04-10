import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { OrganizationSeo } from "./organization";
import { LocalBusinessSeo } from "./localBusinessSeo";
import { ProductSeo } from "./product";
import { ArticleSeo } from "./article";
import { Metadata } from "next";

export * from "./breadCrumb";

type seoListBlockType = typeof blocksValidation.seoListBlockValidation._type;
export const RenderSeoBlock = ({
  data: seoList,
}: {
  data: seoListBlockType;
}) => {
  return (
    <>
      {seoList?.map((seo) => {
        if (seo._type === "organizationSeoBlock") {
          return <OrganizationSeo key={seo._type} {...seo} />;
        }
        if (seo._type === "localBusinessSeoBlock") {
          return <LocalBusinessSeo key={seo._type} {...seo} />;
        }
        if (seo._type === "productSeoBlock") {
          return <ProductSeo key={seo._type} {...seo} />;
        }
        if (seo._type === "articleSeoBlock") {
          return <ArticleSeo key={seo._type} {...seo} />;
        }
      })}
    </>
  );
};

export const generateSeoMetaData = (seoList: seoListBlockType): Metadata => {
  const basicSeo = seoList?.find((seo) => seo._type === "seoBlock");
  if (!basicSeo || basicSeo._type !== "seoBlock")
    return {
      title: "Surewill | Create Your Australian Will Online",
      description:
        "Create your Australian Will online in minutes with Surewill. Be sure your assets are safe by using our simple, secure and affordable online",
      openGraph: {
        title: "Surewill | Create Your Australian Will Online",
        description:
          "Create your Australian Will online in minutes with Surewill. Be sure your assets are safe by using our simple, secure and affordable online",
        images: `${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}/static/sure-will-cover.jpg`,
      },
    };
  return {
    title: basicSeo?.title,
    description: basicSeo?.description,
    openGraph: {
      title: basicSeo?.title,
      description: basicSeo?.description,
      images: basicSeo?.image?.url ? [basicSeo?.image?.url] : [],
      url: basicSeo?.url,
    },
  };
};
