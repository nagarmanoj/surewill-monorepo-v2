import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import { structureSingletons } from "./src/libs/sanity";
import { schemaTypes } from "./schemas";
import { env } from "./env.mjs";

// const singletonActions = new Set(["publish", "discardChanges", "restore"]);
// const singletonTypes = new Set([
//   "emailSubscriptionBanner",
//   "homePage",
//   "howItWorksPage",
//   "FAQPage",
//   "pricingPage",
//   "siteSettings",
//   "startYourWillBanner",
//   "CreateWillPages",
// ]);

const pageList = new Set([
  "homePage",
  "howItWorksPage",
  "FAQPage",
  "pricingPage",
  "CreateWillPages",
  "BlogPages",
  "ContactPage",
  "AboutPage",
]);

const componentList = new Set([
  "emailSubscriptionBanner",
  "startYourWillBanner",
  "mainMenu",
  "footerMenu",
]);

const settingList = new Set(["siteSettings"]);

export default defineConfig({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  basePath: "/admin/studio",
  name: "surewell_sanity_studio",
  title: "Surewill",
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Dashboard")
          .id("room")
          .items([
            S.listItem()
              .title("Custom Pages")
              .child(
                S.list()
                  .title("Custom Pages List")
                  .items([...structureSingletons(pageList, S)])
              ),
            S.listItem()
              .title("Pages")
              .schemaType("blogBlock")
              .child(
                S.documentList()
                  .title("Pages List")
                  .filter('_type == "pageBlock"')
              ),
            S.listItem()
              .title("Blog")
              .schemaType("blogBlock")
              .child(
                S.documentList()
                  .title("Blog List")
                  .filter('_type == "blogBlock"')
              ),
            S.listItem()
              .title("FAQ Page")
              .child(S.document().schemaType("FAQPage").documentId("FAQPage")),
            S.listItem()
              .title("Section")
              .child(
                S.list()
                  .title("Section List")
                  .items([
                    ...structureSingletons(componentList, S),
                    S.listItem()
                      .title("Testimonial")
                      .schemaType("testimonial")
                      .child(
                        S.documentList()
                          .title("Blog List")
                          .filter('_type == "testimonial"')
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Setting")
              .child(
                S.list()
                  .title("Setting List")
                  .items([...structureSingletons(settingList, S)])
              ),
          ]),
    }),
    visionTool(),
    vercelDeployTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !pageList.has(schemaType)),
  },
  // document: {
  //   actions: (input, context) =>
  //   pageList.has(context.schemaType)
  //       ? input.filter(({ action }) => action && singletonActions.has(action))
  //       : input,
  // },
});
