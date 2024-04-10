import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { groq } from "next-sanity";
import { z } from "zod";
import Image from "next/image";
import { CtaBlock } from "~/components/blocks/Cta";
import { sanityFetch } from "~/libs/sanity";
import { BlogCardBlock } from "~/components/blocks/blogCard";
import Link from "next/link";
import {
  BreadcrumbSeo,
  RenderSeoBlock,
  generateSeoMetaData,
} from "~/components/seo";
import { SeoListQuery } from "@/schemas/objects/blocks/query";
import { Metadata } from "next";

const schema = z.object({
  blogPage: z.object({
    seo: blocksValidation.seoListBlockValidation,
    title: z.string().optional().nullable(),
    subTitle: z.string().optional().nullable(),
    image: z
      .object({
        url: z.string().optional().nullable(),
        alt: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
    cta: blocksValidation.linkValidation,
  }),
  blogs: z.array(blocksValidation.blogBlockValidation),
});
const pageQuery = groq`
  {
    "blogPage": *[_type == 'BlogPages'] [0] {
      title,
      subTitle,
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
      ${SeoListQuery}
    },
    "blogs": *[_type == 'blogBlock' && !(_id in path("drafts.**"))] [] {
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

const fetchData = async () => {
  return await sanityFetch(pageQuery, schema);
};

export async function generateMetadata(): Promise<Metadata> {
  const { blogPage } = await fetchData();

  return generateSeoMetaData(blogPage.seo);
}

export default async function BlogPages() {
  const { blogPage, blogs } = await fetchData();
  return (
    <>
      {blogPage?.seo && <RenderSeoBlock data={blogPage?.seo} />}
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
        ]}
      />
      <div></div>
      <div className="flex flex-col lg:flex-row gap-12 container py-12">
        <div className="flex flex-1 flex-col justify-center max-w-[60%]">
          <h1 className="mb-8">{blogPage?.title}</h1>
          {blogPage.subTitle && (
            <h3 className="text-2xl text-brand-purple mb-8">
              {blogPage.subTitle}
            </h3>
          )}
          {blogPage?.cta?.title && (
            <div className="w-full sm:w-[200px]">
              <CtaBlock {...blogPage.cta} />
            </div>
          )}
        </div>
        {blogPage?.image?.url && (
          <div className="flex flex-1 justify-center max-h-xl">
            <Image
              src={blogPage.image.url}
              alt={blogPage?.image?.alt || ""}
              className="rounded-lg w-full max-h-[200px] md:max-h-[557px] max-w-[557px] object-contain"
              width={100}
              height={100}
              priority
            />
          </div>
        )}
      </div>
      <div className="container grid grid-cols-3 mb-20 gap-[30px]">
        {blogs?.map((blog) => (
          <Link key={blog._id} href={`/blog/${blog.slug.current}`}>
            <BlogCardBlock {...blog} />
          </Link>
        ))}
      </div>
    </>
  );
}
