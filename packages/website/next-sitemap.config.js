/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SUREWILL_WEB_URL,
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        [process.env.VERCEL_ENV !== "preview" && process.env.VERCEL_ENV !== "development"
          ? "allow"
          : "disallow"]: "/",
      },
    ],
  },
}
