import { z } from "zod";
import { groq } from "next-sanity";
import { sanityFetch } from "~/libs/sanity";
import { MainLayout } from "~/components/MainLayout";
import { blocksValidation } from "@/schemas/objects/blocks/validation";
import {
  BulletCardBlock,
  ContentBlock,
  LogoListBlock,
  TestimonialCard,
} from "~/components/blocks";
import { ListBlock } from "~/components/blocks/List";
import { PricingOptionCard } from "~/components/blocks/PriceOptionsCard";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { FaqList } from "~/components/ReadyToStart/FaqList";
import {
  SectionWithImage,
  SectionWithSideContent,
} from "~/components/sections";
import {
  RenderSeoBlock,
  generateSeoMetaData,
  BreadcrumbSeo,
} from "~/components/seo";
import { Metadata } from "next";
import { SeoListQuery } from "@/schemas/objects/blocks/query";
// import { TrustPilotSection } from "~/components/TrustPilot";
import { ArrowRight } from "lucide-react";

const schema = z.object({
  intro: z.object({
    content: blocksValidation.contentBlockValidation,
    image: z.object({
      imageUrl: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
    }),
  }),
  whySurewill: z.object({
    content: blocksValidation.contentBlockValidation,
    whyList: blocksValidation.listBlockValidation,
    bulletList: z.array(blocksValidation.bulletCardBlockValidation),
  }),
  price: z.object({
    content: blocksValidation.contentBlockValidation,
    paymentList: blocksValidation.listBlockValidation,
    pricingOptions: z.array(blocksValidation.pricingCardBlockValidation),
  }),
  readyToStart: z.object({
    content: blocksValidation.contentBlockValidation,
    faqSection: z.object({
      faqList: z.array(blocksValidation.faqBlockValidation),
      cta: blocksValidation.linkValidation,
    }),
    testimonialSection: z.object({
      logo: z
        .object({
          url: z.string().optional().nullable(),
          alt: z.string().optional().nullable(),
        })
        .optional()
        .nullable(),
      title: z.string().optional().nullable(),
      testimonialref:
        blocksValidation.TestimonialBlockValidation.nullable().optional(),
      cta: blocksValidation.linkValidation,
    }),
  }),
  seo: blocksValidation.seoListBlockValidation,
});

const pageQuery = groq`
  *[_type == 'homePage'] | order(_createdAt desc)[0] {
    intro {
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
      image {
        "imageUrl": asset->url,
        alt
      },
    },
    whySurewill {
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
      whyList {
        title,
        description,
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
    price {
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
      paymentList {
        title,
        description,
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
      pricingOptions [] {
        title,
        description,
        number,
        currency,
        image {
          "url": asset->url,
            alt
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
    readyToStart {
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
      faqSection {
        faqList [] -> {
          question,
          answer
        },
        cta {
          title,
          target,
          href,
          buttonVaraint,
          id
        }
      },
      testimonialSection {
        logo {
          "url": asset->url,
          alt
        },
        title,
        testimonialref -> {
          name,
          detail
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

export default async function Home() {
  const { intro, price, readyToStart, whySurewill, seo } = await fetchData();
  return (
    <>
      {seo && <RenderSeoBlock data={seo} />}
      <BreadcrumbSeo
        list={[
          {
            name: "Home",
            url: "/",
          },
        ]}
      />
      <MainLayout emailSubscription>
        <SectionWithImage
          wrapperClass="!pt-7 lg:items-start"
          className=""
          content={
            <ContentBlock
              wrapperClass="mt-6 lg:mt-24"
              subtitleClass="max-w-[390px]"
              titleClass="lg:text-[66px] lg:leading-[70px]"
              data={intro?.content}
            />
          }
          image={{ url: intro?.image?.imageUrl, alt: intro?.image?.alt }}
          shape
          shapeBgClass="bg-brand-blue-extraLight"
        />
        <div className="bg-brand-blue-light">
          <SectionWithSideContent
            className="bg-wave-blue bg-bottom bg-no-repeat bg-contain"
            bodyClassName="mb-[30px] !gap-0"
            content={
              <ContentBlock wrapperClass="flex-1" data={whySurewill?.content} />
            }
            sideClassName="lg:min-w-[450px] justify-center"
            sideContent={
              <div>
                <ListBlock data={whySurewill?.whyList} />
              </div>
            }
            bottomContent={
              <div className="flex flex-wrap justify-center gap-6 lg:gap-32 container">
                {whySurewill?.bulletList?.map((bullet) => (
                  <BulletCardBlock
                    className=""
                    key={bullet.title}
                    {...bullet}
                  />
                ))}
              </div>
            }
          />
        </div>
        <SectionWithSideContent
          shape
          shapeBgClass="bg-brand-purple-blue"
          className="bg-brand-purple-blue"
          bodyClassName="pb-[30px] !gap-0"
          sideClassName="flex-1 lg:justify-center"
          content={
            <ContentBlock
              wrapperClass="flex-1"
              titleClass="text-white drop-shadow-text-shadow"
              subtitleClass="text-white"
              descriptionClass="text-white"
              data={price?.content}
            />
          }
          sideContent={
            <LogoListBlock
              reverse
              wrapperClass="flex-1 lg:max-w-[320px]"
              data={price?.paymentList}
            />
          }
          bottomContent={
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 container overflow-hidden pb-14">
              {price?.pricingOptions?.map((priceOption) => (
                <Link
                  className="flex-1 min-w-[300px]"
                  key={priceOption.title}
                  href={
                    priceOption?.cta?.href ||
                    (process.env.NEXT_PUBLIC_SUREWILL_APP_URL as string)
                  }
                >
                  <PricingOptionCard {...priceOption} theme="light" />
                </Link>
              ))}
            </div>
          }
        />
        <SectionWithSideContent
          content={
            <div>
              <ContentBlock
                wrapperClass="flex-1"
                data={readyToStart?.content}
              />
              <div>
                {/* <TrustPilotSection /> */}
                {readyToStart?.testimonialSection?.testimonialref && (
                  <TestimonialCard
                    {...readyToStart?.testimonialSection?.testimonialref}
                  />
                )}

                {readyToStart?.testimonialSection?.cta?.href && (
                  <Link
                    href={readyToStart?.testimonialSection?.cta?.href}
                    target={
                      readyToStart?.testimonialSection?.cta?.target || "_self"
                    }
                  >
                    <Button rightIcon={<ArrowRight />} className="mt-[30px]">
                      {readyToStart?.testimonialSection?.cta?.title}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          }
          bodyClassName="items-stretch"
          sideContent={
            <FaqList
              className="mt-[30px] lg:mt-0 w-full lg:max-w-[440px]"
              cta={readyToStart?.faqSection?.cta}
              list={readyToStart?.faqSection?.faqList}
            />
          }
        />
      </MainLayout>
    </>
  );
}
