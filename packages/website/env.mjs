import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SANITY_DATASET: z.enum(["staging", "production"]),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SUREWILL_APP_URL: z.string(),
    NEXT_PUBLIC_SUREWILL_WEB_URL: z.string(),
    NEXT_PUBLIC_TRUST_PILOT_KEY: z.string(),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH: z.string(),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY: z.string(),
  },
  server: {
    MAILCHIMP_API_KEY: z.string(),
    MAILCHIMP_API_SERVER: z.string(),
    MAILCHIMP_AUDIENCE_ID: z.string(),
    MANDRILL_API_KEY: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SUREWILL_APP_URL: process.env.NEXT_PUBLIC_SUREWILL_APP_URL,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    NEXT_PUBLIC_SUREWILL_WEB_URL: process.env.NEXT_PUBLIC_SUREWILL_WEB_URL,
    MAILCHIMP_API_SERVER: process.env.MAILCHIMP_API_SERVER,
    MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
    MANDRILL_API_KEY: process.env.MANDRILL_API_KEY,
    //GTM
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY,
    NEXT_PUBLIC_TRUST_PILOT_KEY: process.env.NEXT_PUBLIC_TRUST_PILOT_KEY
  },
});
