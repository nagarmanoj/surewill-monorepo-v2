import { groq } from "next-sanity";
import { z } from "zod";
import { MainLayout } from "~/components/MainLayout";
import { sanityFetch } from "~/libs/sanity";
import { blocksValidation } from "../../../../schemas/objects/blocks/validation";
import { BulletCardBlock, ContentBlock } from "~/components/blocks";
import { ListBlock } from "~/components/blocks/List";
import { SeoListQuery } from "@/schemas/objects/blocks/query";

import {
  SectionWithImage,
  SectionWithSideContent,
} from "~/components/sections";
import {
  BreadcrumbSeo,
  generateSeoMetaData,
  RenderSeoBlock,
} from "~/components/seo";
import { Metadata } from "next";

const schema = z.object({
  Introduction: z.object({
    createWillIntro: blocksValidation.contentBlockValidation,
    whyDoINeedWill: blocksValidation.listBlockValidation,
  }),
  IsnotItTooMuchHassle: z.object({
    intro: blocksValidation.contentBlockValidation,
    whySureWill: blocksValidation.listBlockValidation,
    bulletList: z
      .array(blocksValidation.bulletCardBlockValidation)
      .nullable()
      .optional(),
  }),
  WhatIsIncludedInMySurewillPack: z.object({
    heroImage: z.object({
      imageUrl: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
    }),
    content: blocksValidation.contentBlockValidation,
    include: blocksValidation.listBlockValidation,
  }),
  seo: blocksValidation.seoListBlockValidation.nullable().optional(),
});
const pageQuery = groq`
  *[_type == 'CreateWillPages'] | order(_createdAt desc) [0] {
    Introduction {
      createWillIntro {
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
      whyDoINeedWill {
        title,
        list [] {
          listText,
          icon {
            "imageUrl": asset->url,
            alt
          }
        }
      },
    },
    IsnotItTooMuchHassle {
      intro {
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
      whySureWill {
        title,
        list [] {
          listText,
          icon {
            "imageUrl": asset->url,
            alt
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
      bulletList [] {
        title,
        description,
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
      }
    },
    WhatIsIncludedInMySurewillPack {
      heroImage {
        "imageUrl": asset->url,
        alt
      },
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
      include {
        title,
        list [] {
          listText,
          icon {
            "imageUrl": asset->url,
            alt
          }
        },
        cta {
          title,
          target,
          href,
          buttonVaraint,
          id
        }
      }
    },
    ${SeoListQuery}
  }
`;

const fetchData = async () => {
  return await sanityFetch(pageQuery, schema);
};

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchData();
  return generateSeoMetaData(pageData.seo);
}

export default async function FAQPage() {
  const pageData = await fetchData();

  return (
    <MainLayout startYourWill>
      <>
        {pageData?.seo && <RenderSeoBlock data={pageData.seo} />}
        <BreadcrumbSeo
          list={[
            {
              name: "Home",
              url: "/",
            },
            {
              name: "Create Will",
              url: "/create-will",
            },
          ]}
        />
        <SectionWithSideContent
          shape
          content={
            <ContentBlock
              wrapperClass="flex-1"
              data={pageData?.Introduction?.createWillIntro}
            />
          }
          sideContent={
            <div>
              <ListBlock
                className="lg:min-w-[440px] lg:mt-[60px] flex-1"
                data={pageData.Introduction.whyDoINeedWill}
              />
            </div>
          }
        />
        <div className="bg-brand-blue-light">
          <SectionWithSideContent
            className="bg-wave-blue bg-bottom bg-no-repeat bg-contain"
            content={
              <ContentBlock
                wrapperClass="flex-1"
                data={pageData?.IsnotItTooMuchHassle?.intro}
              />
            }
            sideContent={
              <div className="lg:min-w-[440px] lg:mt-[60px]">
                <ListBlock data={pageData?.IsnotItTooMuchHassle?.whySureWill} />
              </div>
            }
            bottomContent={
              <div className="flex flex-wrap justify-center gap-8 lg:gap-32 container">
                {pageData?.IsnotItTooMuchHassle?.bulletList?.map((bullet) => (
                  <BulletCardBlock key={bullet.title} {...bullet} />
                ))}
              </div>
            }
          />
        </div>
        <SectionWithImage
          swap={true}
          content={
            <>
              <ContentBlock
                wrapperClass="flex-1"
                data={pageData?.WhatIsIncludedInMySurewillPack?.content}
              />
              <div className="flex flex-col flex-1 md:justify-center">
                <ListBlock
                  data={pageData?.WhatIsIncludedInMySurewillPack?.include}
                />
              </div>
            </>
          }
          image={{
            url: pageData?.WhatIsIncludedInMySurewillPack?.heroImage?.imageUrl,
            alt: pageData?.WhatIsIncludedInMySurewillPack?.heroImage?.alt,
          }}
        />
      </>
    </MainLayout>
  );
}
