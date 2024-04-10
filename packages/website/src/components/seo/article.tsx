import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { ArticleJsonLd } from "next-seo";

export const ArticleSeo = (
  data: typeof blocksValidation.seoArticleSeoBlockValidation._type
) => {
  return (
    <div>
      <ArticleJsonLd
        useAppDir={true}
        url={data?.url}
        title={data?.title}
        images={data?.image?.url ? [data.image.url] : []}
        datePublished={data?.datePublished}
        authorName={data?.authorName}
        description={data?.description}
      />
    </div>
  );
};
