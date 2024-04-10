import { PaymentOptions } from "./PaymentOptions";
import { FooterSocial } from "./Social";
import { FooterLinks } from "./Links";
import { groq } from "next-sanity";
import { z } from "zod";
import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { sanityFetch } from "~/libs/sanity";

export const schema = z.object({
  introColumn: z.object({
    logo: z.object({
      url: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
      maxWidth: z.number().optional().nullable(),
    }),
    description: z.string().optional().nullable(),
    socials: z.array(
      z.object({
        url: z.string().optional().nullable(),
        alt: z.string().optional().nullable(),
        href: z.string().optional().nullable(),
      })
    ),
  }),
  menuColumn: z.object({
    firstMenus: z.array(blocksValidation.linkValidation),
    secondMenus: z.array(blocksValidation.linkValidation),
  }),
  paymentColumn: z.object({
    title: z.string().optional().nullable(),
    payments: z.array(
      z.object({
        url: z.string().optional().nullable(),
        alt: z.string().optional().nullable(),
      })
    ),
  }),
});

const pageQuery = groq`
  * [_type == "footerMenu"] [0] {
    introColumn {
      title,
      description,
      logo {
        alt,
        "url": asset->url,
        maxWidth
      },
      socials [] {
        "url": asset->url,
        alt,
        href
      }
    },
    menuColumn {
      firstMenus [] {
        title,
        href,
        target,
        buttonVaraint
      },
      secondMenus [] {
        title,
        href,
        target,
        buttonVaraint
      }
    },
    paymentColumn {
      title,
      payments [] {
        "url": asset->url,
        alt
      }
    }
  }
`;

type Props = {
  copyrightNotice: string;
};

export async function Footer({ copyrightNotice }: Props) {
  const pageData = await sanityFetch(pageQuery, schema);

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container pt-10 pb-4">
        <p className="text-xl mb-6">
          {pageData?.introColumn?.logo?.url && (
            <img
              alt={pageData?.introColumn?.logo?.alt || ""}
              src={pageData?.introColumn?.logo?.url}
            />
          )}
        </p>
        <div className="space-y-[60px] md:space-y-0 md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:16 mb-10">
          <FooterSocial {...pageData} />
          <FooterLinks {...pageData} />
          <PaymentOptions {...pageData} />
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-xs sm:text-center text-brand-gray-light">
            {copyrightNotice}
          </span>
        </div>
      </div>
    </footer>
  );
}
