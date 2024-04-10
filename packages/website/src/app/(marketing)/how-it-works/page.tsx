import { groq } from "next-sanity";
import { sanityFetch } from "~/libs/sanity";
import { MainLayout } from "~/components/MainLayout";
import { pageSchema } from "./validation";
import { BulletCardBlock, ContentBlock } from "~/components/blocks";
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
import Image from "next/image";

const pageQuery = groq`
  * [_type == "howItWorksPage"] [0] {
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
    itNotABigJob {
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
      checkList {
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
  const { itNotABigJob, whatIGet, whySurewill, seo } = await fetchData();

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
            name: "How It Work",
            url: "/how-it-works",
          },
        ]}
      />
      <MainLayout startYourWill>
        <SectionWithSideContent
          shape
          content={
            <ContentBlock wrapperClass="flex-1" data={whySurewill?.content} />
          }
          sideClassName="xl:min-w-[450px]"
          sideContent={
            <div className="lg:mt-[60px]">
              <ListBlock data={whySurewill?.whyList} />
            </div>
          }
          bottomContent={
            <div className="flex flex-wrap justify-center gap-8 lg:gap-32 container">
              {whySurewill?.bulletList?.map((bullet) => (
                <BulletCardBlock key={bullet.title} {...bullet} />
              ))}
            </div>
          }
        />
        <div className="bg-brand-blue-light ">
          <SectionWithImage
            className="bg-wave-blue bg-bottom bg-no-repeat bg-contain"
            ballClassName="bg-opacity-30"
            content={
              <div>
                <div className="flex flex-1 flex-col mb-[30px]">
                  <ContentBlock
                    wrapperClass="flex-1"
                    data={itNotABigJob?.content}
                  />
                </div>
                <div className="flex flex-col flex-1 mb-8">
                  <ListBlock
                    className="lg:max-w-[300px]"
                    data={itNotABigJob?.checkList}
                  />
                </div>
              </div>
            }
            image={{
              url: itNotABigJob?.heroImage?.imageUrl,
              alt: itNotABigJob?.heroImage?.alt,
            }}
          />
        </div>
        <SectionWithImage
          swap
          content={
            <div>
              <div className="flex flex-1 flex-col mb-[30px]">
                <ContentBlock wrapperClass="flex-1" data={whatIGet?.content} />
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
        <div className="flex flex-col container py-20 md:py-24 relative z-10 overflow-hidden sm:overflow-visible">
          <div className="lg:max-w-[1920px] ">
            <video width="1920" height="1080" controls preload="none">
              <source src="/static/video/Surewill 1 - medium quality.mp4" type="video/mp4" />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-1  mt-[30px]">
            <a href="/static/pdf/Sample - kids.pdf" className="pr-3">
              <Image 
                src="/static/pdf-svgrepo-com.svg"
                width={75}
                height={75}
                alt="PDF Icom"
              />
              <p>Sample - kids.pdf</p>
            </a>
            <a href="/static/pdf/Sample - no kids.pdf" className="pr-3"> 
              <Image 
                src="/static/pdf-svgrepo-com.svg"
                width={75}
                height={75}
                alt="PDF Icom"
              />
              Sample - no kids.pdf
            </a>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
