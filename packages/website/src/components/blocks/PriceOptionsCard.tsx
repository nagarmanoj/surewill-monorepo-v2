import { GetStartedButton } from "~/components/GetStartedButton";
import Image from "next/image";
import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { Button } from "../ui/button";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

type PricingOptionDataProps =
  typeof blocksValidation.pricingCardBlockValidation._type;

interface PricingCardProps extends PricingOptionDataProps {
  theme?: "light" | "normal";
}

export const PricingOptionCard = ({
  title,
  number,
  description,
  image,
  cta,
  currency,
  theme = "normal",
}: PricingCardProps) => {
  return (
    <div
      className={clsx(
        "flex justify-between h-full rounded-xl p-5 border-2 cursor-pointer relative",
        theme === "light"
          ? "text-white bg-brand-blue-1/30 border-white/10 hover:border-[#61BDD1]/100 hover:bg-brand-blue-1/50 hover:shadow-card-dark"
          : "text-brand-blue-1 bg-white border-brand-purple/10 hover:border-brand-purple hover:shadow-card"
      )}
    >
      <div className="flex-1 max-w-[70%] sm:max-w-none">
        <h4 className="text-2xl mb-2 font-semibold">{title}</h4>
        <div className={clsx("flex gap-2 items-baseline")}>
          <span className="text-2xl mb-6">${number}</span>
          <span>{currency}</span>
        </div>
        <p className="mb-10">{description}</p>
        <div>
          {cta?.title && cta?.href && (
            <Link href={cta.href} target={cta?.target || "_self"}>
              <Button
                rightIcon={<ArrowRight />}
                variant={(cta?.buttonVaraint as any) || "primary"}
              >
                {cta?.title}
              </Button>
            </Link>
          )}
        </div>
      </div>
      {image?.url && (
        <div className="right-0  relative min-w-[40%] sm:min-w-[40%] flex">
          <div className="right-0 relative w-full pb-[100%] self-start sm:self-end">
            <div className="absolute rounded-full bg-brand-gray-light/10 w-full h-full" />
            <div className="absolute w-[120%] h-[120%]">
              <Image src={image?.url} alt={image?.alt || ""} fill />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
