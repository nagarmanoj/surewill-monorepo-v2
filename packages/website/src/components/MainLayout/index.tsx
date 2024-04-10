import { groq } from "next-sanity";
import { z } from "zod";
import { EmailSubscription } from "~/components/EmailSubscription";
import { StartYourWillBanner } from "~/components/StartYourWillBanner";
import { sanityFetch } from "~/libs/sanity";

const emailSubscriptionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  inputPlaceholder: z.string(),
  buttonText: z.string(),
});

export const startYourWillBannerSchema = z.object({
  title: z.string().optional(),
  subTitle: z.string().optional(),
  cta: z.object({
    title: z.string().optional(),
    href: z.string().optional(),
    target: z.string().optional(),
  }),
});

const emailSubscriptionQuery = groq`
  *[_type == 'emailSubscriptionBanner'] | order(_createdAt desc)[0] {
    title,
    subtitle,
    inputPlaceholder,
    buttonText
  }
`;

const startYourWillBannerQuery = groq`
  *[_type == 'startYourWillBanner'] | order(_createdAt desc) [0] {
    title,
    subTitle,
    cta {
      title,
      target,
      href,
      id
    }
  }
`;

interface MainLayoutProps {
  children: React.ReactNode;
  emailSubscription?: boolean;
  startYourWill?: boolean;
}

export const MainLayout = async ({
  children,
  emailSubscription,
  startYourWill,
}: MainLayoutProps) => {
  const [subscriptionBannerContent, startYourWillBanner] = await Promise.all([
    sanityFetch(emailSubscriptionQuery, emailSubscriptionSchema),
    sanityFetch(startYourWillBannerQuery, startYourWillBannerSchema),
  ]);
  return (
    <>
      {children}
      {emailSubscription && (
        <EmailSubscription {...subscriptionBannerContent} />
      )}
      {startYourWill && <StartYourWillBanner {...startYourWillBanner} />}
    </>
  );
};
