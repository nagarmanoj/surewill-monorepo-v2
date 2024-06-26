import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),

    // AWS
    AWS_SUREWILL_ACCESS_KEY: z.string().min(1),
    AWS_SUREWILL_SECRET_KEY: z.string().min(1),
    AWS_S3_BUCKET_NAME: z.string().min(1),
    AWS_SNS_TOPIC_ARN: z.string().min(1),

    // Clerk
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_WEBHOOK_SECRET: z.string().min(1),

    // Stripe
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    STRIPE_SUBSCRIPTION_PRICE_ID: z.string().min(1),

    // Emails
    MANDRILL_API_KEY: z.string().min(1),
    EMAIL_TEMPLATE_SLUG_REGISTER_USER: z.string().min(1),
    EMAIL_TEMPLATE_SLUG_COUPLE_COUPON: z.string().min(1),
    EMAIL_TEMPLATE_SLUG_OWNER_WILL_CREATED: z.string().min(1),
    EMAIL_TEMPLATE_SLUG_EXECUTOR_WILL_CREATED: z.string().min(1),
    EMAIL_TEMPLATE_SLUG_OWNER_WILL_UPDATED: z.string().min(1),
    EMAIL_TEMPLATE_SLUG_BACKUP_EXECUTOR_WILL_CREATED: z.string().min(1),
    EMAIL_TEMPLATE_FOLLOW_UP_NOT_PAID: z.string().min(1),
    EMAIL_TEMPLATE_FOLLOW_UP_NOT_COMPLETE: z.string().min(1),
    FOLLOW_UP_EMAIL_DAYS_AGO: z.string().default("5"),
  },
  client: {
    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),

    // Stripe
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PORTAL_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE: z.string().min(1),

    // Google
    NEXT_PUBLIC_GOOGLE_API_KEY: z.string().min(1),
    NEXT_PUBLIC_WEBSITE_URL: z.string().min(1),

    // GTM
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY: z.string().min(1),

    // Trustpilot
    NEXT_PUBLIC_TRUST_PILOT_KEY: z.string().min(1),
  },
  runtimeEnv: {
    AWS_SUREWILL_ACCESS_KEY: process.env.AWS_SUREWILL_ACCESS_KEY,
    AWS_SUREWILL_SECRET_KEY: process.env.AWS_SUREWILL_SECRET_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_SNS_TOPIC_ARN: process.env.AWS_SNS_TOPIC_ARN,
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_SUBSCRIPTION_PRICE_ID: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,

    // Emails
    MANDRILL_API_KEY: process.env.MANDRILL_API_KEY,
    EMAIL_TEMPLATE_SLUG_REGISTER_USER:
      process.env.EMAIL_TEMPLATE_SLUG_REGISTER_USER,
    EMAIL_TEMPLATE_SLUG_COUPLE_COUPON:
      process.env.EMAIL_TEMPLATE_SLUG_COUPLE_COUPON,
    EMAIL_TEMPLATE_SLUG_OWNER_WILL_CREATED:
      process.env.EMAIL_TEMPLATE_SLUG_OWNER_WILL_CREATED,
    EMAIL_TEMPLATE_SLUG_EXECUTOR_WILL_CREATED:
      process.env.EMAIL_TEMPLATE_SLUG_EXECUTOR_WILL_CREATED,
    EMAIL_TEMPLATE_SLUG_OWNER_WILL_UPDATED:
      process.env.EMAIL_TEMPLATE_SLUG_OWNER_WILL_UPDATED,
    EMAIL_TEMPLATE_SLUG_BACKUP_EXECUTOR_WILL_CREATED:
      process.env.EMAIL_TEMPLATE_SLUG_BACKUP_EXECUTOR_WILL_CREATED,
    EMAIL_TEMPLATE_FOLLOW_UP_NOT_PAID:
      process.env.EMAIL_TEMPLATE_FOLLOW_UP_NOT_PAID,
    EMAIL_TEMPLATE_FOLLOW_UP_NOT_COMPLETE:
      process.env.EMAIL_TEMPLATE_FOLLOW_UP_NOT_COMPLETE,
    FOLLOW_UP_EMAIL_DAYS_AGO: process.env.FOLLOW_UP_EMAIL_DAYS_AGO,

    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,

    // Stripe
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    NEXT_PUBLIC_STRIPE_PORTAL_URL: process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL,
    NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE:
      process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_PRICE,

    // Google
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,

    // Trustpilot
    NEXT_PUBLIC_TRUST_PILOT_KEY: process.env.NEXT_PUBLIC_TRUST_PILOT_KEY,

    // GTM
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH:
      process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_AUTH,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID:
      process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ENV_ID,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_KEY,
  },
});
