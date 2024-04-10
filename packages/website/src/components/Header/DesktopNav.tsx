"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "~/libs/utils";
import { schema } from "./index";
import Image from "next/image";

export function DesktopNav({ logo, menus }: typeof schema._type) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex gap-6 lg:gap-10 mt-[30px] flex-1 lg:flex-auto sm:ml-[30px] lg:ml-0">
      <Link className="!cursor-pointer !select-none sm:min-w-[196px]" href="/">
        <Image
          src={logo?.url}
          alt={logo?.alt || ""}
          className="w-[152px] h-[34px] mt-[5px] sm:mt-0 sm:w-auto sm:h-auto"
          width={196}
          height={44}
        />
      </Link>
      <nav className="hidden gap-6 lg:flex self-end mb-[30px]">
        {menus?.map((item) => {
          if (!item?.href) return null;
          return (
            <Link
              key={item?.title}
              href={item?.href}
              target={item?.target || "_self"}
              className={cn(
                "relative flex transition-colors font-lg font-semibold text-lg whitespace-nowrap"
                // item.href.startsWith(`/${segment}`) &&
                //   "underline underline-offset-8 decoration-[3px] decoration-brand-blue"
              )}
            >
              {item.href.startsWith(`/${segment}`) && (
                <div className="absolute h-[3px] rounded-full w-full bg-brand-blue -bottom-[3px]" />
              )}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
