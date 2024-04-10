import Link from "next/link";
import { FOOTER_LINKS_CONFIG } from "~/config/navigation";
import { schema } from "./index";

export function FooterLinks({ menuColumn }: typeof schema._type) {
  return (
    <div className="grid gap-3 grid-cols-2 leading-8">
      <div className="flex flex-col">
        {menuColumn?.firstMenus?.map((link) => (
          <Link
            key={link?.href}
            href={link?.href || "#"}
            target={link?.target || "_self"}
            className="hover:text-gray-200"
          >
            {link?.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-col">
        {menuColumn?.secondMenus?.map((link) => (
          <Link
            key={link?.href}
            href={link?.href || "#"}
            target={link?.target || "_self"}
            className="hover:text-gray-200"
          >
            {link?.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
