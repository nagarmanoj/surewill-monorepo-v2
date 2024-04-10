"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { routes } from "~/config/routes";
import { cn } from "~/libs/utils";

export function PageLink() {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <Link
        href={routes.howItWorks}
        className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
      >
        How it works
      </Link>
    );
  }
  return <></>;
}
