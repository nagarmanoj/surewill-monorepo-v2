import React, { useState } from "react";
import {
  UseFormSetValue,
  FieldErrors,
  UseFormClearErrors,
  Control,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { AddressInput } from "~/components/AddressInput";
import {
  AddressSchema,
  EMPTY_ADDRESS,
  getInitialAddressLine,
} from "~/utils/addresses";
import { FieldValues } from "../../schema";

type Props = {
  control: Control<FieldValues>;
  peopleOptions: Array<{
    id: string;
    fullName: string;
    address: AddressSchema;
  }>;
  setFormValue: UseFormSetValue<FieldValues>;
  fieldIndex: number;
  errors: FieldErrors<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  fieldHasPersonSelected: boolean;
  isPersonOptionSelected: (name: string) => boolean;
  onSelectPerson: (name: string) => void;
  address: AddressSchema;
  isInitialCharity: boolean;
};

export function FinancialBeneficiary({
  control,
  setFormValue,
  peopleOptions,
  clearErrors,
  fieldIndex,
  errors,
  fieldHasPersonSelected,
  isPersonOptionSelected,
  onSelectPerson,
  address,
  isInitialCharity,
}: Props) {
  const [hasCharity, setHasCharity] = useState(isInitialCharity);
  return (
    <>
      <div className="flex flex-col gap-1">
        {!hasCharity && (
          <>
            {peopleOptions
              .filter((person) => {
                if (fieldHasPersonSelected) {
                  return isPersonOptionSelected(person.fullName);
                }
                return true;
              })
              .map((person, personIndex) => (
                <PersonOption
                  key={personIndex}
                  personName={person.fullName}
                  isChecked={isPersonOptionSelected(person.fullName)}
                  onClick={(checked: boolean) => {
                    if (checked) {
                      setFormValue(
                        `financialBeneficiaries.${fieldIndex}.fullName`,
                        person.fullName
                      );
                      setFormValue(
                        `financialBeneficiaries.${fieldIndex}.address`,
                        person.address
                      );
                      setFormValue(
                        `financialBeneficiaries.${fieldIndex}.charityName`,
                        ""
                      );
                      onSelectPerson(person.fullName);
                    }
                  }}
                />
              ))}
            {!fieldHasPersonSelected && (
              <>
                {peopleOptions?.length ? (
                  <div className="mb-4 mt-2 text-brand-gray">Or</div>
                ) : null}
                <div className="mb-4 flex flex-col gap-4">
                  <FormField
                    control={control}
                    name={`financialBeneficiaries.${fieldIndex}.fullName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Full legal name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <AddressInput
                      initialValue={getInitialAddressLine(address)}
                      formFieldPrefix={`financialBeneficiaries.${fieldIndex}.address`}
                      errors={
                        errors?.financialBeneficiaries?.[fieldIndex]?.address
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-4">
        {!fieldHasPersonSelected && (
          <>
            {!hasCharity && <div className="text-brand-gray">Or</div>}
            <FormField
              control={control}
              name={`financialBeneficiaries.${fieldIndex}.charityName`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value: string) => {
                      setFormValue(
                        `financialBeneficiaries.${fieldIndex}.fullName`,
                        ""
                      );
                      setFormValue(
                        `financialBeneficiaries.${fieldIndex}.address`,
                        EMPTY_ADDRESS
                      );
                      clearErrors(
                        `financialBeneficiaries.${fieldIndex}.fullName`
                      );
                      clearErrors(
                        `financialBeneficiaries.${fieldIndex}.address`
                      );
                      setHasCharity(true);
                      field.onChange(value);
                    }}
                    defaultValue={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="text-brand-gray">
                        <SelectValue placeholder="Pick a charity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RSPCA Australia Incorporated">
                        RSPCA Australia Incorporated
                      </SelectItem>
                      <SelectItem value="Surf Live Saving Foundation">
                        Surf Live Saving Foundation
                      </SelectItem>
                      <SelectItem value="The Cancer Council Australia">
                        The Cancer Council Australia
                      </SelectItem>
                      <SelectItem value="Lifeline Australia Ltd">
                        Lifeline Australia Ltd
                      </SelectItem>
                      <SelectItem value="Australian Conservation Foundation Incorporated">
                        Australian Conservation Foundation Incorporated
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={control}
          name={`financialBeneficiaries.${fieldIndex}.moneyReceived`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative md:max-w-[200px]">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-brand-purple">$</span>
                  </div>
                  <Input
                    placeholder="0.00"
                    type="number"
                    step={0.01}
                    min={0}
                    className="pl-7"
                    {...field}
                    value={field.value || undefined}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
