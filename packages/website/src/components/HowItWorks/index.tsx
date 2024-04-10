import Image from "next/image";
import { groq } from "next-sanity";
import { z } from "zod";
import { PageSection } from "~/components/PageSection";
import { sanityFetch } from "~/libs/sanity";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const schema = z.object({
  howItWorksSummary: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    reasonsWhy: z.object({
      title: z.string(),
      list: z.array(
        z.object({
          title: z.string(),
          imageAlt: z.string(),
          imageUrl: z.string(),
        })
      ),
      cta: z.object({
        title: z.string(),
        href: z.string(),
        target: z.string(),
      }),
    }),
    steps: z.array(
      z.object({
        imageUrl: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
});

const pageQuery = groq`
  *[_type == 'howItWorksPage'] | order(_createdAt desc)[0] {
    howItWorksSummary {
      title,
      subtitle,
      description,
      reasonsWhy {
        title,
        list [] {
          title,
          "imageUrl": icon.asset-> url,
          "imageAlt": icon.alt
        },
        cta {
          title,
          href,
          target,
          id
        }
      },
      "steps":steps[]{
        "imageUrl": image.asset->url,
        "title": title,
        "description": description
      }
    }
  }
`;

export async function HowItWorksScreen() {
  const pageData = await sanityFetch(pageQuery, schema);
  return (
    <>
      <PageSection
        title={pageData.howItWorksSummary.title}
        titleClass="text-brand-blue-1"
        subtitle={pageData.howItWorksSummary.subtitle}
        description={pageData.howItWorksSummary.description}
      >
        <div className="flex flex-col flex-1 justify-center items-center mb-8">
          <div>
            <h4 className="text-2xl mb-6 text-brand-purple">
              {pageData.howItWorksSummary.reasonsWhy.title}
            </h4>
            <ul className="text-xl leading-8 text-brand-blue-1 space-y-3">
              {pageData.howItWorksSummary.reasonsWhy.list.map((item) => (
                <li key={item.title} className="flex items-center gap-3">
                  <div>
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className="w-6 h-6 object-contain"
                      width={24}
                      height={24}
                      priority
                    />
                  </div>
                  <div>{item.title}</div>
                </li>
              ))}
            </ul>
            {pageData.howItWorksSummary.reasonsWhy.cta.href && (
              <Link
                href={pageData.howItWorksSummary.reasonsWhy.cta.href}
                target={pageData.howItWorksSummary.reasonsWhy.cta.target}
              >
                <Button
                  className="mt-[30px]"
                  variant="secondary"
                  rightIcon={<ArrowRight />}
                >
                  {pageData.howItWorksSummary.reasonsWhy.cta.title}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </PageSection>
      <div className="flex flex-wrap justify-center gap-8 lg:gap-32">
        {pageData?.howItWorksSummary?.steps?.map(
          ({ title, description, imageUrl }, index) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-[150px] h-[150px] rounded-full bg-brand-green/20 flex items-center justify-center relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={title} className="select-none" />
                <p className="absolute text-[120px] font-semibold -left-[30px] bottom-[-40px]">
                  {index + 1}
                </p>
              </div>
              <div className="text-xl max-w-[225px] mt-6">
                <p className="font-medium text-2xl text-brand-purple">
                  {title}
                </p>
                <p className="text-xl text-brand-blue-1">{description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
