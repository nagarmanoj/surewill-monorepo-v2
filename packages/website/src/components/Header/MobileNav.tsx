"use client";
import Link from "next/link";
import { env } from "@/env.mjs";
import { X, Menu, ArrowRight } from "lucide-react";
import { cn } from "~/libs/utils";
import { LogoLink } from "./LogoLink";
import { useState } from "react";
import { schema } from "./index";
import { Drawer } from "../Drawer";
import { useAppContext } from "../Context/app";
import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";

export function MobileNav({ logo, menus }: typeof schema._type) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const contextData = useAppContext();
  const {
    menuDrawer,
    actions: { setMenuDrawer },
  } = contextData;
  return (
    <div className="lg:hidden">
      {/* <Menu
        onClick={() => setMenuDrawer(true)}
        className="lg:hidden cursor-pointer self-center"
        size={30}
      /> */}

      <Drawer active={menuDrawer} onClickBackdrop={() => setMenuDrawer(false)}>
        <div className="border-r h-full shadow-lg">
          <div className="relative z-20 p-6">
            <div className="flex justify-end">
              <X
                size={30}
                className="cursor-pointer"
                onClick={() => setMenuDrawer(false)}
              />
            </div>
            <Link
              className=" !cursor-pointer"
              href="/"
              onClick={() => setMenuDrawer(false)}
            >
              <img className="my-6" src={logo?.url} alt={logo?.alt || ""} />
            </Link>

            <nav className="mb-3 text-sm">
              {menus?.map((item) => {
                if (!item?.href) return null;
                return (
                  <Link
                    key={item?.title}
                    href={item.href}
                    onClick={() => setMenuDrawer(false)}
                    className={cn(
                      "relative flex rounded-md p-2 text-xl font-medium hover:underline",
                      item.href.startsWith(`/${segment}`) && "underline"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
            <hr />
            <Link
              href={`${process.env.NEXT_PUBLIC_SUREWILL_APP_URL}/sign-in`}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-xl font-medium hover:underline mt-3"
              )}
            >
              Sign In
            </Link>

            <Link
              className="w-full block mt-4"
              href={env.NEXT_PUBLIC_SUREWILL_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="!w-full flex" rightIcon={<ArrowRight />}>
                Start your Will
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );

  return (
    <>
      {menuDrawer}
      <button
        className="flex items-center space-x-2 lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <X /> : <Menu />}
      </button>
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 lg:hidden",
          !showMobileMenu && "hidden"
        )}
      >
        <div className="relative z-20 grid gap-6 rounded-md bg-white p-4 shadow-xl">
          <LogoLink />
          <nav className="grid grid-flow-row auto-rows-max text-sm">
            {menus?.map((item) => {
              if (!item?.href) return null;
              return (
                <Link
                  key={item?.title}
                  href={item.href}
                  className={cn(
                    "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
            <hr />
            <Link
              href="/login"
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
