import { HeaderComponent } from "./header";
import { groq } from "next-sanity";
import { sanityFetch } from "~/libs/sanity";
import { z } from "zod";
import { blocksValidation } from "@/schemas/objects/blocks/validation";

export const schema = z.object({
  logo: z.object({
    url: z.string(),
    alt: z.string().optional().nullable(),
  }),
  menus: z.array(blocksValidation.linkValidation).optional().nullable(),
});

const pageQuery = groq`
  * [_type == "mainMenu"] [0] {
    logo {
      "url": asset->url,
      alt
    },
    menus [] {
      title,
      target,
      href
    }
  }
`;

export async function Header() {
  const pageData = await sanityFetch(pageQuery, schema);
  return <HeaderComponent {...pageData} />;
}
