import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { blocksValidation } from "../../../schemas/objects/blocks/validation";
import { CtaBlock } from "./Cta";
import Link from "next/link";

interface ListBlockProps {
  titleClass?: string;
  descriptionClass?: string;
  data: typeof blocksValidation.listBlockValidation._type;
  className?: string;
}

export const ListBlock = ({
  titleClass,
  descriptionClass,
  data,
  className,
}: ListBlockProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col flex-1 lg:min-w-[320px] mb-[30px]",
        className
      )}
    >
      <div>
        <h4
          className={twMerge(
            clsx("text-2xl mb-6 font-medium text-brand-purple", titleClass)
          )}
        >
          {data?.title}
        </h4>
        {data.description && (
          <p className={twMerge(clsx("text-xl mb-10", descriptionClass))}>
            {data.description}
          </p>
        )}
        {data.list && (
          <ul
            className={clsx(
              "text-xl leading-8 text-brand-blue-1 flex-wrap gap-x-6 block"
              // "sm:grid sm:grid-cols-2 md:grid lg:block md:grid-cols-3 gap-x-6"
            )}
          >
            {data.list.map((item) => {
              if (!item.listText) return null;
              return (
                <li
                  key={item.listText}
                  className={clsx(
                    "flex items-center gap-3",
                    item?.icon?.imageUrl && "my-1.5"
                  )}
                >
                  {item.icon?.imageUrl && (
                    <div className="w-6 h-6 flex-shrink-0">
                      <Image
                        src={item.icon?.imageUrl}
                        alt={item.icon?.alt || ""}
                        className="w-6 h-6 object-contain"
                        width={24}
                        height={24}
                        priority
                      />
                    </div>
                  )}

                  {item?.href && (
                    <Link className="underline" href={item?.href}>
                      {item.listText}
                    </Link>
                  )}
                  {!item?.href && <div>{item.listText}</div>}
                </li>
              );
            })}
          </ul>
        )}
        {data.cta?.title && (
          <div className="mt-[30px]">
            <CtaBlock {...data.cta} />
          </div>
        )}
      </div>
    </div>
  );
};
