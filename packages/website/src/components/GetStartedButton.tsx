import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/libs/utils";
import { env } from "@/env.mjs";

type Props = {
  size?: "default" | "sm" | "lg";
  fullWidth?: boolean;
  buttonText?: string;
};

export function GetStartedButton({
  size = "default",
  fullWidth = false,
  buttonText = "Start your Will",
}: Props) {
  return (
    <Link
      href={env.NEXT_PUBLIC_SUREWILL_APP_URL}
      className={cn(
        buttonVariants({ variant: "primary", size }),
        fullWidth && "w-full"
      )}
    >
      <span className="mr-2">{buttonText}</span>
      <ArrowRight />
    </Link>
  );
}
