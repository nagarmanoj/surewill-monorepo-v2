import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface SectionWithImageProps {
  content: JSX.Element;
  image: {
    url?: string | null;
    alt?: string | null;
  };
  ballClassName?: string;
  className?: string;
  wrapperClass?: string;
  swap?: boolean;
  shape?: boolean;
  shapeBgClass?: string;
}

export const SectionWithImage = ({
  content,
  image,
  ballClassName,
  className,
  swap = false,
  shape = false,
  shapeBgClass = "bg-brand-blue-extraLight",
  wrapperClass,
}: SectionWithImageProps) => {
  return (
    <div className={twMerge("relative", className)}>
      <div
        className={twMerge(
          "flex flex-col container py-20 md:py-24 relative z-10 overflow-hidden sm:overflow-visible",
          swap ? "lg:flex-row-reverse" : "lg:flex-row",
          wrapperClass
        )}
      >
        <div className="flex flex-1 flex-col justify-center lg:min-w-[557px] lg:max-w-[557px]">
          {content}
        </div>
        {image?.url && (
          <div
            className={clsx(
              "flex flex-1 mt-[30px] lg:mt-0 items-start justify-center",
              swap ? "lg:justify-end" : "lg:justify-end"
            )}
          >
            <div className="relative w-full sm:max-w-[400px] lg:max-w-[556px] mt-7">
              <div
                className={twMerge(
                  "rounded-full bg-white w-full pb-[100%]",
                  swap ? "-ml-9 lg:-ml-12" : "ml-9 lg:ml-12",
                  ballClassName
                )}
              />
              <div
                className={twMerge(
                  "absolute w-[97%] h-[97%] top-5 max-w-[556px]",
                  swap ? "left-5" : "right-5"
                )}
              >
                <Image
                  src={image?.url}
                  alt={image?.alt || ""}
                  className="absolute rounded-lg object-contain"
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {shape && (
        <div
          style={{
            maskImage: "url(/static/illustrator/shape.svg)",
            WebkitMaskImage: "url(/static/illustrator/shape.svg)",
          }}
          className={twMerge(
            "absolute top-[36px] left-0 w-full h-full bg-center bg-no-repeat ![mask-position:bottom] ![mask-repeat:no-repeat] ![mask-size: 338px 36px] z-[1]",
            shapeBgClass
          )}
        />
      )}
    </div>
  );
};
