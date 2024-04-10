"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "~/config/routes";
import { cn } from "~/libs/utils";

const NAV_CONFIG = [
  {
    title: "Dashboard",
    href: routes.dashboard.main,
  },
  {
    title: "My Profile",
    href: routes.dashboard.profile,
  },
  {
    title: "My Will",
    href: routes.dashboard.will,
  },
  {
    title: "Billing",
    href: routes.dashboard.billing.main,
  },
];

type Props = {
  onChange?: () => void;
};

export function Navigation({ onChange }: Props) {
  const pathname = usePathname();
  const getIsActive = (href: string) => {
    if (href === routes.dashboard.main) {
      return pathname === routes.dashboard.main;
    }
    return pathname?.startsWith(href);
  };
  return (
    <div className="ml-4 w-full text-white">
      <ul>
        {NAV_CONFIG.map((navItem) => (
          <li
            key={navItem.title}
            className={cn(
              "mb-1 p-2",
              getIsActive(navItem.href) && "rounded-l-md bg-white/20"
            )}
          >
            <Link href={navItem.href} onClick={() => onChange?.()}>
              {navItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
