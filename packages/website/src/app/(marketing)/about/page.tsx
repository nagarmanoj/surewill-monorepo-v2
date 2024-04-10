import { groq } from "next-sanity";
import { sanityFetch } from "~/libs/sanity";
import { MainLayout } from "~/components/MainLayout";

import {
  HorizontalBulletCard,
  ContentBlock,
  TestimonialCard,
} from "~/components/blocks";
import { ListBlock } from "~/components/blocks/List";
import {
  SectionWithImage,
  SectionWithSideContent,
} from "~/components/sections";
import { z } from "zod";
import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { Metadata } from "next";
import {
  BreadcrumbSeo,
  RenderSeoBlock,
  generateSeoMetaData,
} from "~/components/seo";
import { SeoListQuery } from "@/schemas/objects/blocks/query";
import { TrustPilotSection } from "~/components/TrustPilot";

const schema = z.object({
  content: blocksValidation.contentBlockValidation,
  sideBar: blocksValidation.listBlockValidation.optional().nullable(),
  list: z.array(blocksValidation.bulletCardBlockValidation),
  seo: blocksValidation.seoListBlockValidation,
});

const testimonialSchema = z.object({
  testimonialList: z.array(blocksValidation.TestimonialBlockValidation),
});

const pageQuery = groq`
  *[_type == 'AboutPage'] [0] {
    content {
      title,
      subTitle,
      description,
      cta {
        title,
        target,
        href,
        buttonVaraint,
        id
      }
    },
    sideBar {
      title,
      description,
      list [] {
        listText,
        icon {
          "imageUrl": asset->url,
          alt,
          url
        }
      },
      cta {
        title,
        target,
        href,
        buttonVaraint,
        id
      }
    },
    list [] {
      title,
      description,
      body [],
      number,
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
    },
    ${SeoListQuery}
  }
`;

const testimonialQuery = groq`
  {
    "testimonialList": *[_type == 'testimonial'] [] {
      name,
      detail
    }
  }
`;

const fetchData = async () => {
  return await sanityFetch(pageQuery, schema);
};

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchData();

  return generateSeoMetaData(pageData.seo);
}

export default async function HowItWorksPage() {
  const { content, list, sideBar, seo } = await fetchData();
  const { testimonialList } = await sanityFetch(
    testimonialQuery,
    testimonialSchema
  );

  return (
    <>
      {seo && <RenderSeoBlock data={seo} />}
      <BreadcrumbSeo
        list={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "About",
            url: "/about",
          },
        ]}
      />
      <MainLayout emailSubscription>
        <SectionWithSideContent
          className="!pb-0"
          content={<ContentBlock wrapperClass="flex-1" data={content} />}
          sideClassName="justify-center flex-1"
          sideContent={
            <div className=" lg:mt-[60px] lg:max-w-[250px]">
              {sideBar && (
                <ListBlock data={sideBar} className="lg:min-w-[250px]" />
              )}
            </div>
          }
          bottomContent={
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 container my-[60px]">
              {list?.map((bullet) => (
                <HorizontalBulletCard key={bullet.title} {...bullet} />
              ))}
            </div>
          }
        />
        <TrustPilotSection />
        <div className="grid md:grid-cols-2 container gap-[30px] mx-auto mb-[60px]">
          {testimonialList?.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </MainLayout>
    </>
  );
}
