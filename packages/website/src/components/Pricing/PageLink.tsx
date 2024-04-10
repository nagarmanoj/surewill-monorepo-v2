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
        href={routes.pricing}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "self-start mt-4 border-gray-400"
        )}
      >
        Pricing options
      </Link>
    );
  }
  return <></>;
}
