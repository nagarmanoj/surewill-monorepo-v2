"use client";
import { Disclosure } from "@headlessui/react";
import { blocksValidation } from "@/schema/objects/blocks/validation";
import { Plus, Minus } from "lucide-react";

export const FaqBlock = ({
  answer,
  question,
}: typeof blocksValidation.faqBlockValidation._type) => {
  return (
    <div className="text-left w-full bg-white rounded-lg border border-brand-blue-light">
      <Disclosure>
        {({ open }: any) => (
          <>
            <Disclosure.Button className="py-4 px-5 w-full text-left flex items-center">
              <p className="flex-1">{question}</p>
              <div className="p-[3px] border-[1.5px] border-brand-purple rounded-full box-border">
                {open ? (
                  <Minus width={15} height={15} color="#742183" />
                ) : (
                  <Plus width={15} height={15} color="#742183" />
                )}
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500 py-4 px-5">
              {answer}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
