import { groq } from "next-sanity";
import { z } from "zod";
import { MainLayout } from "~/components/MainLayout";
import { sanityFetch } from "~/libs/sanity";
import { blocksValidation } from "../../../../schemas/objects/blocks/validation";
import { ContentBlock } from "~/components/blocks";
import { ListBlock } from "~/components/blocks/List";
import { FaqGroupBlock } from "~/components/blocks/FaqGroup";

import { SectionWithSideContent } from "~/components/sections";
import { FaqSeo } from "~/components/seo/faq";
import {
  BreadcrumbSeo,
  RenderSeoBlock,
  generateSeoMetaData,
} from "~/components/seo";
import { SeoListQuery } from "@/schemas/objects/blocks/query";
import { Metadata } from "next";

const schema = z.object({
  Introduction: z.object({
    faqIntroContent: blocksValidation.contentBlockValidation,
    whatCanWeHelpWith: blocksValidation.listBlockValidation,
  }),
  faqSection: z
    .array(blocksValidation.faqGroupItemBlockValidation)
    .nullable()
    .optional(),
  seo: blocksValidation.seoListBlockValidation,
});
const pageQuery = groq`
  *[_type == 'FAQPage'] | order(_createdAt desc) [0] {
    Introduction {
      faqIntroContent {
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
      whatCanWeHelpWith {
        title,
        list [] {
          listText,
          href
        }
      }
    },
    faqSection [] {
      faqGroupName,
      id,
      faqList [] -> {
        answer,
        question
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
  const data = pageData?.faqSection?.map((faqGroup) => {
    return faqGroup.faqList;
  });
  const faqList = data ? data?.flat().filter((item) => !!item) : [];
  return (
    <>
      {pageData?.seo && <RenderSeoBlock data={pageData?.seo} />}
      <BreadcrumbSeo
        list={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "FAQ",
            url: "/faq",
          },
        ]}
      />
      <FaqSeo data={faqList as any} />
      <MainLayout startYourWill>
        <SectionWithSideContent
          content={
            <ContentBlock
              wrapperClass="flex-1"
              data={pageData?.Introduction?.faqIntroContent}
            />
          }
          sideClassName="my-[30px] lg:min-w-[450px]"
          sideContent={
            <div>
              <ListBlock data={pageData.Introduction.whatCanWeHelpWith} />
            </div>
          }
          bottomContent={
            <div className="mx-auto container space-y-10 mt-20">
              {pageData?.faqSection?.map((item) => (
                <div key={item.faqGroupName}>
                  <FaqGroupBlock
                    FaqGroupWrapperClass="max-w-[675px] mx-auto"
                    {...item}
                  />
                </div>
              ))}
            </div>
          }
        />
      </MainLayout>
    </>
  );
}
