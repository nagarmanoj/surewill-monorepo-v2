import clsx from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  titleClass?: string;
  subtitle: string;
  subtitleClass?: string;
  description: string;
  descriptionClass?: string;
  children: ReactNode;
};

export function PageSection({
  title,
  subtitle,
  description,
  children,
  titleClass,
  subtitleClass,
  descriptionClass,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <h2 className={twMerge(clsx("mb-8", titleClass))}>{title}</h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 grow">
            <h3
              className={twMerge(clsx("text-brand-purple mb-8", subtitleClass))}
            >
              {subtitle}
            </h3>
            <p className={twMerge(clsx("text-xl mb-10", descriptionClass))}>
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center mb-8">
        {children}
      </div>
    </div>
  );
}
