import React from "react";
import { Control, Path } from "react-hook-form";
import { Check } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/libs/utils";
import { FormSectionTitle } from "./FormSectionTitle";

function Option({
  optionName,
  optionValue,
  fieldValue,
}: {
  optionName: string;
  optionValue: string;
  fieldValue: string;
}) {
  const isSelected = optionValue === fieldValue;
  return (
    <RadioGroupItem
      value={optionValue}
      className={cn(
        buttonVariants({
          variant: "secondary",
        }),
        "text-base text-brand-gray",
        isSelected && "border-brand-green text-brand-green hover:bg-white"
      )}
    >
      {fieldValue === optionValue && <Check />}
      <span className="ml-1">{optionName}</span>
    </RadioGroupItem>
  );
}

type Props<TFieldValues extends { cremated: string }> = {
  control: Control<TFieldValues>;
};

export function HandleRemainsFormSection<
  TFieldValues extends {
    cremated: string;
  }
>({ control }: Props<TFieldValues>) {
  return (
    <div className="max-w-form-3">
      <FormSectionTitle>I want to be</FormSectionTitle>
      <FormField
        control={control}
        name={"cremated" as Path<TFieldValues>}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(value: string) => field.onChange(value as any)}
                defaultValue={field.value}
                className="grid grid-cols-1 gap-x-[30px] lg:grid-cols-3"
              >
                <FormItem>
                  <Option
                    optionName="Cremated"
                    optionValue="cremated"
                    fieldValue={field.value}
                  />
                </FormItem>
                <FormItem>
                  <Option
                    optionName="Buried"
                    optionValue="buried"
                    fieldValue={field.value}
                  />
                </FormItem>
                <FormItem>
                  <Option
                    optionName="Undecided"
                    optionValue="undecided"
                    fieldValue={field.value}
                  />
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
