"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { startYourWillBannerSchema } from "../MainLayout";
import { trackDataLayer } from "~/libs/dataLayer";
import { ArrowRight } from "lucide-react";

const ROUTES_WITH_EMAIL_SUBSCRIPTION_BANNER: Array<null | string> = [null];

type Props = {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  buttonText: string;
};

const onClickHandle = () => {
  trackDataLayer({
    event: "startYourWillButtonClick",
  });
};

export function StartYourWillBanner({
  title,
  subTitle,
  cta,
}: typeof startYourWillBannerSchema._type) {
  const segment = useSelectedLayoutSegment();

  if (!ROUTES_WITH_EMAIL_SUBSCRIPTION_BANNER.includes(segment)) return null;

  return (
    <div className="bg-brand-green-light h-[244px] relative overflow-hidden">
      <div className="absolute bottom-0 -right-40 md:right-0 bg-wave-green bg-right-bottom bg-no-repeat bg-contain w-[1440px] h-[244px]" />
      <div className="relative container flex flex-col lg:flex-row justify-around gap-6 py-14 md:py-[70px] lg:py-24 items-center">
        <div className="flex flex-col flex-1 text-xl">
          <p className="font-semibold pb-1">{title}</p>
          <p>{subTitle}</p>
        </div>
        {cta.href && (
          <Link href={cta.href} target={cta.target}>
            <Button rightIcon={<ArrowRight />} onClick={onClickHandle}>
              {cta.title}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
