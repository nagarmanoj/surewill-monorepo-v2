import { groq } from "next-sanity";
import { z } from "zod";
import { MainLayout } from "~/components/MainLayout";
import { sanityFetch } from "~/libs/sanity";
import { blocksValidation } from "../../../../schemas/objects/blocks/validation";
import { ContentBlock, LogoListBlock } from "~/components/blocks";
import {
  BreadcrumbSeo,
  RenderSeoBlock,
  generateSeoMetaData,
} from "~/components/seo";
import { SectionWithSideContent } from "~/components/sections";
import { ContactForm } from "~/container/contactForm";
import { SeoListQuery } from "@/schemas/objects/blocks/query";
import { Metadata } from "next";

const schema = z.object({
  content: blocksValidation.contentBlockValidation,
  checkFaqFirst: blocksValidation.contentBlockValidation,
  seo: blocksValidation.seoListBlockValidation,
  social: blocksValidation.listBlockValidation.optional().nullable(),
});
const pageQuery = groq`
  *[_type == 'ContactPage'] [0] {
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
    checkFaqFirst {
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
    social {
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
    <>
      <MainLayout emailSubscription>
        {pageData?.seo && <RenderSeoBlock data={pageData.seo} />}
        <BreadcrumbSeo
          list={[
            {
              name: "Home",
              url: "/",
            },
            {
              name: "Contact",
              url: "/contact",
            },
          ]}
        />
        <SectionWithSideContent
          content={
            <div>
              <ContentBlock wrapperClass="flex-1" data={pageData?.content} />
              <ContactForm />
            </div>
          }
          sideContent={
            <div className="lg:max-w-[320px]">
              <ContentBlock data={pageData?.checkFaqFirst} />
              {pageData?.social && (
                <LogoListBlock data={pageData?.social} logoClass="w-9" />
              )}
                <div className="lg:max-w-[320px] mt-5">
                  <video width="320" height="240" controls preload="none">
                    <source src="/static/video/Surewill 1 - medium quality.mp4" type="video/mp4" />
                    <track
                      src="/static/video/Surewill 1 - medium quality.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
            </div>
          }
        />
      </MainLayout>
    </>
  );
}
