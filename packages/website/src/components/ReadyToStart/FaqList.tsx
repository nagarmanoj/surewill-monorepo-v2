"use client";
import { Disclosure } from "@headlessui/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { blocksValidation } from "@/schemas/objects/blocks/validation";
import { twMerge } from "tailwind-merge";
import { CtaBlock } from "../blocks/Cta";
interface FaqListProps {
  cta: typeof blocksValidation.linkValidation._type;
  list: (typeof blocksValidation.faqBlockValidation._type)[];
  className?: string;
}

export const FaqList = ({ cta, list, className }: FaqListProps) => {
  return (
    <div className={className}>
      <div className={twMerge("sm:min-w-[440px] w-full space-y-2.5")}>
        {list.map((item) => (
          <div
            key={item.answer}
            className="text-left w-full bg-white rounded-lg border border-brand-blue-light"
          >
            <Disclosure>
              {({ open }: any) => (
                <>
                  <Disclosure.Button className="py-4 px-5 w-full text-left flex items-center">
                    <p className="flex-1">{item.question}</p>
                    <div className="p-[3px] border-[1.5px] border-brand-purple rounded-full box-border">
                      {open ? (
                        <Minus width={15} height={15} color="#742183" />
                      ) : (
                        <Plus width={15} height={15} color="#742183" />
                      )}
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="text-gray-500 py-4 px-5 border-t border-brand-gray-light/20">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
      {cta?.href && (
        <div className="mt-[30px]">
          <CtaBlock {...cta} />
        </div>
      )}
    </div>
  );
};
