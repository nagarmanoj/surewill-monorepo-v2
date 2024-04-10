import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { env } from "@/env.mjs";

export function WebsiteLink() {
  return (
    <Link
      className="flex items-center pl-4 text-sm text-white"
      href={env.NEXT_PUBLIC_WEBSITE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      to surewill.com.au{" "}
      <ExternalLink className="ml-1 inline h-4 w-4 text-brand-gray-light" />
    </Link>
  );
}
