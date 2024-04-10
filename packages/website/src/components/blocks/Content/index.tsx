import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { blocksValidation } from "../../../../schemas/objects/blocks/validation";
import { CtaBlock } from "../Cta";
import { TypingText } from "./TypingText";

interface ContentBlockProps {
  wrapperClass?: string;
  titleClass?: string;
  subtitleClass?: string;
  descriptionClass?: string;
  data: typeof blocksValidation.contentBlockValidation._type;
  animateTitle?: boolean;
}

export const ContentBlock = ({
  titleClass,
  subtitleClass,
  descriptionClass,
  wrapperClass,
  data,
  animateTitle = false,
}: ContentBlockProps) => {
  return (
    <div className={clsx(wrapperClass)}>
      {data.title && (
        <h1
          className={twMerge(
            "mb-[30px] text-5xl lg:text-[50px] lg:leading-[60px] text-brand-blue-1",
            titleClass
          )}
        >
          {animateTitle ? (
            <TypingText
              strings={[data.title]}
              typeSpeed={40}
              loop={false}
              fadeOutDelay={100}
              startDelay={1000}
            />
          ) : (
            data.title
          )}
        </h1>
      )}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 grow">
          {data.subTitle && (
            <h3
              className={twMerge(
                clsx("text-brand-purple text-2xl mb-[30px]", subtitleClass)
              )}
            >
              {data.subTitle}
            </h3>
          )}
          {data.description && (
            <div
              className={twMerge(
                clsx(
                  "text-xl mb-[30px] whitespace-pre-wrap break-words text-brand-blue-1",
                  descriptionClass
                )
              )}
            >
              {data.description}
            </div>
          )}
        </div>
      </div>
      {data.cta && (
        <div className="">
          <CtaBlock {...data.cta} />
        </div>
      )}
    </div>
  );
};
