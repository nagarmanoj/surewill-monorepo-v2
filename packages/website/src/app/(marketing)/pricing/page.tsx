import { groq } from "next-sanity";
import { sanityFetch } from "~/libs/sanity";
import { MainLayout } from "~/components/MainLayout";

import { pageSchema, testimonialSchema } from "./validation";
import {
  ContentBlock,
  LogoListBlock,
  TestimonialCard,
} from "~/components/blocks";
import { PricingOptionCard } from "~/components/blocks/PriceOptionsCard";
import { ListBlock } from "~/components/blocks/List";
import {
  SectionWithImage,
  SectionWithSideContent,
} from "~/components/sections";
import {
  BreadcrumbSeo,
  RenderSeoBlock,
  generateSeoMetaData,
} from "~/components/seo";
import { Metadata } from "next";
import { SeoListQuery } from "@/schemas/objects/blocks/query";
import { PlusIcon } from "lucide-react";
import { TrustPilotSection } from "~/components/TrustPilot";
import Image from "next/image";

const testimonialQuery = groq`
  {
    "testimonialList": *[_type == 'testimonial'] [] {
      name,
      detail
    }
  }
`;

const pageQuery = groq`
  * [_type == "pricingPage"] [0] {
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
      },
      storagePlan [] {
        title,
        parentheses,
        subTitle,
        description
      }
    },
    whatIGet {
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
      whatInclude {
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
      heroImage {
        "imageUrl": asset->url,
        alt
      }
    },
    ${SeoListQuery}
  }
`;

const fetchData = async () => {
  return await sanityFetch(pageQuery, pageSchema);
};

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchData();

  return generateSeoMetaData(pageData.seo);
}

export default async function HowItWorksPage() {
  const { intro, seo, whatIGet } = await sanityFetch(pageQuery, pageSchema);
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
            name: "Pricing",
            url: "/pricing",
          },
        ]}
      />
      <MainLayout startYourWill>
        <SectionWithSideContent
          shape
          content={<ContentBlock wrapperClass="flex-1" data={intro?.content} />}
          sideClassName="lg:min-w-[450px]"
          sideContent={
            <LogoListBlock
              reverse
              wrapperClass="max-w-[320px]"
              data={intro?.paymentList}
            />
          }
          bottomContent={
            <div>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 container mt-[45px]">
                {intro?.pricingOptions?.map((priceOption) => (
                  <div key={priceOption.title} className="flex-1 min-w-[300px]">
                    <PricingOptionCard {...priceOption} />
                  </div>
                ))}
              </div>
              <div className="container mt-[60px] grid grid-cols-2 gap-10">
                {intro?.storagePlan?.map((plan) => (
                  <div key={plan.title} className="flex gap-4">
                    <div>
                      <PlusIcon className="w-8 h-8 text-brand-green" />
                    </div>
                    <div className="space-y-2.5">
                      <p className="text-2xl text-brand-blue-1 font-medium">
                        {plan.title}
                        <span className="font-normal ml-2">
                          {plan.parentheses}
                        </span>
                      </p>
                      <p className="text-2xl text-brand-blue-1">
                        {plan.subTitle}
                      </p>
                      <p className="text-xl text-brand-blue-1">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                ))}
                <p className="text-2xl text-brand-blue-1">
                  <Image 
                    src='/static/imgpsh_fullsize_anim.png'
                    width={150}
                    height={150}
                    alt="Money Back Guarantee"
                  />
                  100% Money Back Guarantee
                </p>
              </div>
            </div>
          }
        />
        <div className="bg-brand-blue-light">
          <SectionWithImage
            className="bg-wave-blue bg-bottom bg-no-repeat bg-contain"
            ballClassName="bg-opacity-30"
            content={
              <div>
                <div className="flex flex-1 flex-col mb-[30px]">
                  <ContentBlock
                    wrapperClass="flex-1"
                    data={whatIGet?.content}
                  />
                </div>
                <div className="flex flex-col flex-1 mb-8">
                  <ListBlock
                    className="lg:max-w-[350px]"
                    data={whatIGet?.whatInclude}
                  />
                </div>
              </div>
            }
            image={{
              url: whatIGet?.heroImage?.imageUrl,
              alt: whatIGet?.heroImage?.alt,
            }}
          />
        </div>
        {/* <TrustPilotSection /> */}
        <div className="grid md:grid-cols-2 container gap-[30px] mx-auto mb-[60px]">
          {testimonialList?.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </MainLayout>
    </>
  );
}
