import { groq } from "next-sanity";
import { z } from "zod";
import { PricingOption } from "~/components/PricingOption";
import { PageSection } from "~/components/PageSection";
import { sanityFetch } from "~/libs/sanity";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  pricingOptions: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    paymentOptionsList: z.array(
      z.object({
        imageUrl: z.string(),
        alt: z.string(),
      })
    ),
    cta: z.object({
      title: z.string(),
      href: z.string(),
      target: z.string(),
    }),
    pricing: z.array(
      z.object({
        title: z.string(),
        price: z.string(),
        description: z.string(),
        heroImage: z.object({
          alt: z.string().optional(),
          imageUrl: z.string().optional(),
        }),
      })
    ),
  }),
});

const pageQuery = groq`
  *[_type == 'pricingPage'] | order(_createdAt desc)[0] {
    pricingOptions {
      title,
      subtitle,
      description,
      paymentOptionsList [] {
        "imageUrl": asset->url,
        alt
      },
      cta {
        title,
        href,
        target,
        id
      },
      pricing [] {
        title,
        description,
        price,
        heroImage {
          alt,
          "imageUrl": asset->url
        }
      }
    }
  }
`;

export async function PricingScreen() {
  const {
    pricingOptions: {
      cta,
      description,
      pricing,
      subtitle,
      title,
      paymentOptionsList,
    },
  } = await sanityFetch(pageQuery, schema);
  return (
    <>
      <PageSection
        title={title}
        titleClass="text-white"
        subtitle={subtitle}
        subtitleClass="text-white"
        description={description}
        descriptionClass="text-white"
      >
        <div className="max-w-[320px] grow flex flex-col items-start justify-center mb-8">
          <div className="flex gap-5 mb-10 flex-wrap-reverse">
            {paymentOptionsList.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={logo.alt} src={logo.imageUrl} alt={logo.alt} />
            ))}
          </div>
          {cta.href && (
            <Link href={cta.href} target={cta.target}>
              <Button variant="outline" rightIcon={<ArrowRight />}>
                {cta.title}
              </Button>
            </Link>
          )}
        </div>
      </PageSection>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {pricing?.map(({ title, price, description, heroImage }) => (
          <div key={title} className="flex-1 min-w-[300px]">
            <PricingOption
              title={title}
              price={price}
              description={description}
              image={heroImage.imageUrl}
              imageAlt={heroImage.alt}
            />
          </div>
        ))}
      </div>
    </>
  );
}
