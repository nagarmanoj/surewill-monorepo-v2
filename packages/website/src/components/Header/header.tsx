"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/libs/utils";
import { env } from "@/env.mjs";
import Headroom from "react-headroom";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { schema } from "./index";
import { useAppContext } from "../Context/app";

export function HeaderComponent(pageData: typeof schema._type) {
  const [isSticky, setIsSticky] = useState(false);
  const {
    actions: { setMenuDrawer },
  } = useAppContext();
  return (
    <>
      <Headroom
        className="z-40"
        onPin={() => {
          setIsSticky(true);
        }}
        onUnpin={() => {
          setIsSticky(false);
        }}
        onUnfix={() => {
          setIsSticky(false);
        }}
      >
        <div
          className={clsx(
            "relative bg-[#F1F9FC]/70 overflow-hidden bg-opacity-70",
            isSticky && "shadow-sm"
          )}
        >
          <header className="relative !z-50 container ">
            <div className="flex h-[100px] lg:justify-between">
              <DesktopNav {...pageData} />

              <nav className="flex mt-[30px]">
                <Link
                  href={`${env.NEXT_PUBLIC_SUREWILL_APP_URL}/sign-in`}
                  className={cn(
                    buttonVariants({ variant: "link", size: "sm" }),
                    "text-lg hidden sm:min-w-min lg:block whitespace-nowrap self-end mb-[23px] px-[30px]"
                  )}
                >
                  Sign In
                </Link>
                <div>
                  <Link
                    className="hidden sm:block"
                    href={env.NEXT_PUBLIC_SUREWILL_APP_URL}
                  >
                    <Button rightIcon={<ArrowRight />}>Start your Will</Button>
                  </Link>
                  <Link
                    className="hidden xs:block sm:hidden"
                    href={env.NEXT_PUBLIC_SUREWILL_APP_URL}
                  >
                    <Button className="!w-auto">Start</Button>
                  </Link>
                </div>
                {/* <GetStartedButton /> */}
              </nav>
              <Image
                onClick={() => setMenuDrawer(true)}
                className="lg:hidden cursor-pointer self-center w-[30px] h-4 ml-4 sm:ml-[30px]"
                src="/static/burger-menu.svg"
                width={30}
                height={16}
                alt="burger menu"
              />
            </div>
          </header>
        </div>
      </Headroom>
      <MobileNav {...pageData} />
    </>
  );
}
