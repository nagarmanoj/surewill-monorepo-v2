import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface SectionWithSideContentProps {
  content: JSX.Element;
  sideContent: JSX.Element;
  bottomContent?: JSX.Element;
  className?: string;
  bodyClassName?: string;
  sideClassName?: string;
  shape?: boolean;
  shapeBgClass?: string;
}

export const SectionWithSideContent = ({
  content,
  sideContent,
  bottomContent,
  className,
  bodyClassName,
  sideClassName,
  shape = false,
  shapeBgClass = "bg-brand-blue-extraLight",
}: SectionWithSideContentProps) => {
  return (
    <div className={twMerge("py-20 md:pb-20 md:py-24 relative", className)}>
      {shape && (
        <div
          style={{
            maskImage: "url(/static/illustrator/shape.svg)",
            WebkitMaskImage: "url(/static/illustrator/shape.svg)",
          }}
          className={twMerge(
            "absolute top-0 left-0 w-full h-[calc(100%+2.25rem)] bg-center bg-no-repeat ![mask-position:bottom] ![mask-repeat:no-repeat] ![mask-size: 338px 36px] z-[1]",
            shapeBgClass
          )}
        />
      )}
      <div
        className={twMerge(
          "relative flex flex-col lg:flex-row container z-10 lg:gap-6",
          bodyClassName
        )}
      >
        <div className="flex justify-center lg:min-w-[557px] lg:max-w-[557px]">
          {content}
        </div>
        <div
          className={twMerge(
            "flex mt-[30px] lg:mt-0 lg:justify-center flex-1",
            sideClassName
          )}
        >
          {sideContent}
        </div>
      </div>
      <div className="relative z-10 mt-[30px] lg:mt-0">{bottomContent}</div>
    </div>
  );
};
