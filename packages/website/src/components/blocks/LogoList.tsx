"use client";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { blocksValidation } from "../../../schemas/objects/blocks/validation";
import { CtaBlock } from "./Cta";
import Link from "next/link";

interface LogoListBlockProps {
  reverse?: boolean;
  wrapperClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  logoClass?: string;
  data: typeof blocksValidation.listBlockValidation._type;
}

interface RenderLinkProps {
  children: JSX.Element;
  link?: string | null;
}

const RenderLink = ({ children, link }: RenderLinkProps) => {
  if (link) {
    return <Link href={link}>{children}</Link>;
  }
  return children;
};

export const LogoListBlock = ({
  reverse = false,
  wrapperClass,
  titleClass,
  descriptionClass,
  logoClass,
  data,
}: LogoListBlockProps) => {
  return (
    <div className={clsx("flex flex-col flex-1", wrapperClass)}>
      <div className="space-y-[30px]">
        <h4
          className={twMerge(
            clsx("text-2xl mb-6 text-brand-purple", titleClass)
          )}
        >
          {data?.title}
        </h4>
        {data.description && (
          <p className={twMerge(clsx("text-xl", descriptionClass))}>
            {data.description}
          </p>
        )}
        <div
          className={clsx(
            "flex gap-5",
            reverse ? "flex-wrap-reverse" : "flex-wrap"
          )}
        >
          {data?.list?.map((logo) => {
            if (!logo?.icon?.imageUrl) return null;
            return (
              <RenderLink key={logo?.icon?.imageUrl} link={logo?.icon?.url}>
                <img
                  className={logoClass}
                  src={logo?.icon?.imageUrl}
                  alt={logo?.icon?.alt || ""}
                />
              </RenderLink>
            );
          })}
        </div>
        {data.cta?.title && (
          <div className="">
            <CtaBlock {...data.cta} />
          </div>
        )}
      </div>
    </div>
  );
};
