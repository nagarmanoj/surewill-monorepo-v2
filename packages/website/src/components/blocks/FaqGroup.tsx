import { blocksValidation } from "@/schema/objects/blocks/validation";
import { FaqBlock } from "./Faq";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type FaqGroupBlockDataInterface =
  typeof blocksValidation.faqGroupItemBlockValidation._type;

interface FaqGroupBlockProps extends FaqGroupBlockDataInterface {
  FaqGroupWrapperClass?: string;
  FaqGroupBodyClass?: string;
}

export const FaqGroupBlock = ({
  faqList,
  faqGroupName,
  id,
  FaqGroupBodyClass,
  FaqGroupWrapperClass,
}: FaqGroupBlockProps) => {
  return (
    <div
      id={id || undefined}
      className={twMerge(clsx("max-w-[440px] w-full", FaqGroupWrapperClass))}
    >
      <h3 className={clsx("text-2xl text-brand-purple font-medium mb-5")}>
        {faqGroupName}
      </h3>
      <div className={twMerge(clsx("w-full space-y-2.5", FaqGroupBodyClass))}>
        {faqList?.map((item) => (
          <FaqBlock key={item.question} {...item} />
        ))}
      </div>
    </div>
  );
};
