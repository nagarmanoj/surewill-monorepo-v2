import React from "react";
import Link from "next/link";
import { Control } from "react-hook-form";
import { Check, X, ExternalLink } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { buttonVariants } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { cn } from "~/libs/utils";
import type { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
};

export function DonateOrgansFormSection({ control }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
      <div className="flex max-w-2xl grow flex-col gap-2">
        <div className="mb-4 text-2xl font-medium">
          I want to donate my organs
        </div>
        <FormField
          control={control}
          name="donateOrgans"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: "yes" | "no") => field.onChange(value)}
                  defaultValue={field.value}
                  className="flex flex-col gap-8 sm:flex-row"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem
                      value="yes"
                      className={cn(
                        buttonVariants({
                          variant: "secondary",
                        }),
                        "text-base text-brand-gray",
                        field.value === "yes" &&
                          "border-brand-green text-brand-green hover:bg-white"
                      )}
                    >
                      {field.value === "yes" && <Check />}
                      <span className="ml-1">Yes</span>
                    </RadioGroupItem>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem
                      value="no"
                      className={cn(
                        buttonVariants({
                          variant: "secondary",
                        }),
                        "text-base text-brand-gray",
                        field.value === "no" &&
                          "border-red-600 text-red-600 hover:bg-white"
                      )}
                    >
                      {field.value === "no" && <X />}
                      <span className="ml-1">No</span>
                    </RadioGroupItem>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="inline font-light text-brand-gray lg:mt-12 lg:max-w-[200px]">
        <span className="mr-1">Optional: Join the register at</span>
        <Link
          href="https://www.donatelife.gov.au/register-donor-today"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap underline"
        >
          Donate Life
        </Link>
        <ExternalLink className="mb-1 ml-1 inline h-4 w-4 text-brand-gray-light" />
      </div>
    </div>
  );
}
