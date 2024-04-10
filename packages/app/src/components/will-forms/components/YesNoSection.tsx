"use client";

import { ReactNode, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/libs/utils";
import { FormSectionTitle } from "./FormSectionTitle";

type Props = {
  title: string;
  initialValue?: "yes" | "no" | null;
  onClickYes?: () => void;
  onClickNo?: () => void;
  children: ReactNode;
};

export function YesNoSection({
  title,
  initialValue = null,
  onClickYes,
  onClickNo,
  children,
}: Props) {
  const [selected, setSelected] = useState<"yes" | "no" | null>(initialValue);
  return (
    <>
      <div className="max-w-form-2">
        <FormSectionTitle>{title}</FormSectionTitle>
        <div className="mb-8 grid grid-cols-1 gap-x-[30px] gap-y-4 sm:grid-cols-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              if (selected !== "yes") {
                setSelected("yes");
                onClickYes?.();
              }
            }}
            className={cn(
              "text-base text-brand-gray",
              selected === "yes" && "border-brand-green text-brand-green"
            )}
          >
            {selected === "yes" && <Check />}
            <span className="ml-1">Yes</span>
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              if (selected !== "no") {
                setSelected("no");
                onClickNo?.();
              }
            }}
            className={cn(
              "text-base text-brand-gray",
              selected === "no" && "border-red-600 text-red-600"
            )}
          >
            {selected === "no" && <X />}
            <span className="ml-1">No</span>
          </Button>
        </div>
      </div>
      {selected === "yes" && children}
    </>
  );
}
