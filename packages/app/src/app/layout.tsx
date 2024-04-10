import "~/styles/globals.css";
import localFont from "next/font/local";
import { AuthProvider } from "~/components/AuthProvider";
import Script from "next/script";
import { env } from "@/env.mjs";

const font = localFont({
  src: [
    {
      path: "../../public/fonts/NewHero-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NewHero-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NewHero-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/NewHero-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "Surewill",
  description: "Generate your Australian Will online in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={font.className}>
          <>
            {children}
            <Script
              id="gtm_tag"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=${env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH}&gtm_preview=${env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY}');`,
              }}
            />
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY}&gtm_auth=${env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH}&gtm_preview=${env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID}&gtm_cookies_win=x"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
          </>
        </body>
      </html>
    </AuthProvider>
  );
}
