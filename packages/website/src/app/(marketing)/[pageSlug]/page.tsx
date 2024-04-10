import { groq } from "next-sanity";
import { sanityFetch } from "~/libs/sanity";
import Image from "next/image";
import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { SeoListQuery } from "@/schemas/objects/blocks/query";
import { Metadata } from "next";
import { BreadcrumbSeo, RenderSeoBlock } from "~/components/seo";
import { RichText } from "~/components/RichText";

const pageQuery = groq`
  * [_type == "pageBlock" && slug.current == $slug] [0] {
    title,
    subTitle,
    cover {
      "url": asset->url,
      alt
    },
    body [],
    ${SeoListQuery}
  }
`;

const fetchData = async (slug: string) => {
  return await sanityFetch(pageQuery, blocksValidation.pageBlockValidation, {
    slug: slug,
  });
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const pageData = await fetchData(params.pageSlug);

  const basicSeo = pageData?.seo?.find(
    (seo) => seo._type === "seoBlock"
  ) as any;

  return {
    title: basicSeo?.title || `${pageData?.title} | Surewill Australia`,
    description: basicSeo?.description || pageData?.subTitle,
    openGraph: {
      title: basicSeo?.title || `${pageData?.title} | Surewill Australia`,
      description: basicSeo?.description || pageData?.subTitle || "",
      images: pageData?.cover?.url
        ? [basicSeo?.image?.url || pageData?.cover?.url]
        : [
            `${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}/static/sure-will-cover.jpg`,
          ],
      url:
        basicSeo?.url ||
        `${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}/${params.pageSlug}`,
    },
  };
}

export default async function BlogDetailPages({
  params,
}: {
  params: { pageSlug: string };
}) {
  const { title, subTitle, body, cover, seo } = await fetchData(
    params.pageSlug
  );

  return (
    <div className="bg-[#F1F9FC]">
      {seo && <RenderSeoBlock data={seo} />}
      <BreadcrumbSeo
        list={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: title,
            url: `/${params.pageSlug}`,
          },
        ]}
      />
      <div>
        <div className="flex flex-col lg:flex-row gap-6 container py-12">
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mb-8">{title}</h1>
            <h3 className="text-2xl text-brand-purple">{subTitle}</h3>
          </div>
        </div>
        {cover?.url && (
          <div className="flex flex-1 justify-center pb-12">
            <Image
              src={cover.url}
              alt={cover?.alt || ""}
              className="rounded-lg w-full max-h-[200px] md:max-h-[557px] max-w-[557px] object-contain"
              width={1024}
              height={1024}
              priority
            />
          </div>
        )}
        <div className="whitespace-pre-wrap container pb-20 min-h-[calc(100vh-400px)]">
          {body && <RichText data={body} />}
        </div>
      </div>
    </div>
  );
}
