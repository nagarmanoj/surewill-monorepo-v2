import { groq } from "next-sanity";
import { sanityFetch } from "~/libs/sanity";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArticleJsonLd } from "next-seo";
import { Metadata } from "next";
import { SeoListQuery } from "@/schemas/objects/blocks/query";
import { BreadcrumbSeo, RenderSeoBlock } from "~/components/seo";
import { z } from "zod";
import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { BlogCardBlock } from "~/components/blocks/blogCard";

import "swiper/css";
import { MoreBlogs } from "~/components/MoreBlog";
import { RichText } from "~/components/RichText";

const schema = z.object({
  blog: blocksValidation.blogBlockValidation.nullable().optional(),
  blogs: z.array(blocksValidation.blogBlockValidation),
});

const pageQuery = groq`
  {
    "blog":*[_type == 'blogBlock' && slug.current == $slug] [0] {
      _id,
      title,
      slug,
      subTitle,
      description,
      body [],
      cta {
        title,
        target,
        href,
        buttonVaraint,
        id
      },
      image {
        "url": asset->url,
          alt
      },
      _createdAt,
      _updatedAt,
      ${SeoListQuery}
    },
    "blogs": *[_type == 'blogBlock' && !(_id in path("drafts.**"))] [0...6] {
      _id,
      title,
      slug,
      subTitle,
      description,
      cta {
        title,
        target,
        href,
        buttonVaraint,
        id
      },
      image {
        "url": asset->url,
          alt
      },
      _createdAt,
      _updatedAt
    }
  }
`;

const fetchData = async (slug: string) => {
  return await sanityFetch(pageQuery, schema, {
    slug: slug,
  });
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { blog: pageData } = await fetchData(params.slug);

  const basicSeo = pageData?.seo?.find(
    (seo) => seo._type === "seoBlock"
  ) as any;

  return {
    title: basicSeo?.title || `${pageData?.title} | Surewill Australia`,
    description:
      basicSeo?.description ||
      pageData?.subTitle ||
      "Create your Australian Will online in minutes with Surewill. Be sure your assets are safe by using our simple, secure and affordable online",
    openGraph: {
      title: basicSeo?.title || `${pageData?.title} | Surewill Australia`,
      description:
        basicSeo?.description ||
        pageData?.subTitle ||
        "Create your Australian Will online in minutes with Surewill. Be sure your assets are safe by using our simple, secure and affordable online",
      images: pageData?.image?.url
        ? [basicSeo?.image?.url || pageData?.image?.url]
        : [
            `${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}/static/sure-will-cover.jpg`,
          ],
      url:
        basicSeo?.url ||
        `${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}/blog/${params.slug}`,
    },
  };
}

export default async function BlogDetailPages({
  params,
}: {
  params: { slug: string };
}) {
  const { blog: pageData, blogs } = await fetchData(params.slug);

  const renderCta = ({
    cta,
  }: typeof blocksValidation.blogBlockValidation._type) => {
    if (cta?.href)
      return (
        <Link href={cta.href}>
          <Button>{cta?.title}</Button>
        </Link>
      );
    return <Button>{cta?.title}</Button>;
  };
  if (!pageData) return null;
  return (
    <>
      {pageData?.seo && <RenderSeoBlock data={pageData.seo} />}
      <BreadcrumbSeo
        list={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Blog",
            url: "/blog",
          },
          {
            name: pageData?.title,
            url: `${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}/blog/${params.slug}`,
          },
        ]}
      />
      <ArticleJsonLd
        useAppDir={true}
        images={pageData?.image?.url ? [pageData.image.url] : []}
        title={pageData?.title}
        description={pageData?.subTitle || ""}
        url={`${process.env.NEXT_PUBLIC_SUREWILL_WEB_URL}/blog/${params.slug}`}
        datePublished={pageData._createdAt}
        authorName="Sure Will Admin"
      />
      <div>
        <div className="flex flex-col lg:flex-row gap-6 container py-12">
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="mb-8">{pageData.title}</h1>
            <h3 className="text-2xl text-brand-purple mb-8">
              {pageData.subTitle}
            </h3>
            {pageData?.cta?.title && renderCta(pageData)}
          </div>
          {pageData?.image?.url && (
            <div className="flex flex-1 justify-center max-h-xl relative items-start">
              <div className="w-full pb-[100%] relative">
                <Image
                  src={pageData.image.url}
                  alt={pageData?.image?.alt || ""}
                  className="rounded-lg w-full object-cover"
                  fill
                  priority
                />
              </div>
            </div>
          )}
        </div>
        <div className="whitespace-pre-wrap container pb-20">
          {pageData.body && <RichText data={pageData.body} />}
        </div>
      </div>
      <div className="bg-brand-purple-blue pt-[60px] pb-20 overflow-hidden">
        <div className="container mx-auto">
          <h3 className="text-[50px] font-semibold mb-[30px] text-white">
            More on Wills? Sure…
          </h3>
          <MoreBlogs blogs={blogs} />
        </div>
      </div>
    </>
  );
}
