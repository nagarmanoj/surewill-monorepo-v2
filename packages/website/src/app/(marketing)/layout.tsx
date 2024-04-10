import localFont from "next/font/local";
import { groq } from "next-sanity";
import { z } from "zod";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { sanityFetch } from "~/libs/sanity";
import { cn } from "~/libs/utils";
import { AppContextProvider } from "~/components/Context/app";
import Script from "next/script";

const font = localFont({
  src: [
    {
      path: "../../../public/fonts/NewHero-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/NewHero-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/NewHero-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

const siteSettingsSchema = z.object({
  meta: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
  copyrightNotice: z.string(),
});

const siteSettingsQuery = groq`
  *[_type == 'siteSettings'] | order(_createdAt desc)[0] {
    meta,
    copyrightNotice
  }
`;

// export async function generateMetadata() {
//   const siteSettings = await sanityFetch(siteSettingsQuery, siteSettingsSchema);
//   const { meta } = siteSettings;
//   return {
//     title: meta.metaTitle,
//     description: meta.metaDescription,
//   };
// }

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const [siteSettings] = await Promise.all([
    sanityFetch(siteSettingsQuery, siteSettingsSchema),
  ]);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon/favicon.png" />
        <meta name="apple-mobile-web-app-title" content="Sure Will" />
        <meta name="application-name" content="Surewill" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />

        <link rel="mask-icon" href="/favicon/favicon.png" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn("min-h-screen", font.className)}>
        <AppContextProvider>
          <div className="flex flex-col">
            <Header />
            <main>{children}</main>
            <Footer copyrightNotice={siteSettings.copyrightNotice} />
          </div>
        </AppContextProvider>
        <Script
          id="gtm_tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH}&gtm_preview=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY}');`,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY}&gtm_auth=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH}&gtm_preview=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID}&gtm_cookies_win=x"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <Script
          id="trustPilotTag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
          a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];
          f.parentNode.insertBefore(a,f)})(window,document,'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
          tp('register', "${process.env.NEXT_PUBLIC_TRUST_PILOT_KEY}");`,
          }}
        />
        <Script
          id="trustPilotWidgetTag"
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        />
      </body>
    </html>
  );
}
