import { ReactNode } from "react";
import Link from "next/link";
import { WillCreationType } from "@prisma/client";
import { routes } from "~/config/routes";
import { cn } from "~/libs/utils";

type Props = {
  willType: WillCreationType;
  title: string;
  description: string;
  image?: ReactNode;
  hideWillTypeParam?: boolean;
  disabled?: boolean;
};

export function WillType({
  willType,
  title,
  description,
  image,
  hideWillTypeParam = false,
  disabled = false,
}: Props) {
  const href = hideWillTypeParam
    ? routes.dashboard.profile
    : `${routes.dashboard.profile}?willType=${willType}`;

  const Component = disabled ? "div" : Link;
  return (
    <Component href={href} className="group flex flex-col items-center">
      <div
        className={cn(
          "absolute h-[150px] w-[150px] rounded-full bg-white",
          !disabled && "group-hover:bg-brand-green-extraLight"
        )}
      />
      {image}
      <div className="max-w-[250px] text-xl font-semibold text-brand-purple">
        {title}
      </div>
      <p className="max-w-[250px] text-center">{description}</p>
    </Component>
  );
}
