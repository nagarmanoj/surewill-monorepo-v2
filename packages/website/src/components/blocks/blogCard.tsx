import clsx from "clsx";
import { blocksValidation } from "../../../schemas/objects/blocks/validation";
import Image from "next/image";

type BlogCardData = typeof blocksValidation.blogBlockValidation._type;

interface BlogCardBlockProps extends BlogCardData {
  theme?: "normal" | "light";
}

export const BlogCardBlock = ({
  title,
  image,
  theme = "normal",
}: BlogCardBlockProps) => {
  return (
    <div
      className={clsx(
        "group relative w-full max-w-[450px] p-5 rounded-lg overflow-hidden cursor-pointer border-2",
        theme === "normal" && "border-brand-blue-light",
        theme === "light" &&
          "border-brand-blue-light/20 hover:border-brand-blue-light/50"
      )}
    >
      {image?.url && (
        <Image
          src={image?.url}
          alt={image?.alt || title}
          fill
          className="object-cover object-center"
        />
      )}
      <div
        className={clsx(
          "absolute w-full h-full left-0 top-0",
          "bg-card-gradient group-hover:bg-card-gradient-active"
        )}
      />
      <div className="relative pb-[100%] w-2/3">
        <p className="absolute w-full top-0 left-0 text-2xl font-medium text-white">
          {title}
        </p>
      </div>
    </div>
  );
};
