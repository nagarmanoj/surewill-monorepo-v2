import { twMerge } from "tailwind-merge";
import { blocksValidation } from "../../../schemas/objects/blocks/validation";
import Image from "next/image";
import { RichText } from "../RichText";

type BulletCardBlockData =
  typeof blocksValidation.bulletCardBlockValidation._type;

interface BulletCardBlockProps extends BulletCardBlockData {
  className?: string;
}

export const BulletCardBlock = ({
  title,
  body,
  cta,
  number,
  image,
  className,
}: BulletCardBlockProps) => {
  return (
    <div
      key={title}
      className={twMerge("flex flex-col items-center", className)}
    >
      <div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full bg-brand-green/20 flex items-center justify-center relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {image?.url && (
          <img
            src={image?.url}
            alt={image?.alt || ""}
            className="select-none w-2/5 h-2/5"
          />
        )}
        {number && (
          <p className="absolute text-[100px] lg:text-[120px] font-semibold -left-[30px] bottom-[-40px]">
            {number}
          </p>
        )}
      </div>
      <div className="text-xl max-w-[225px] mt-6">
        {title && (
          <p className="font-medium text-2xl text-brand-purple">{title}</p>
        )}
        {body && (
          <p className="text-xl text-brand-blue-1">
            <RichText data={body} />
          </p>
        )}
      </div>
    </div>
  );
};
