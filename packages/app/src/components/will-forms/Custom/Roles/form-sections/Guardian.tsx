import React, { useMemo } from "react";
import { Control, FieldErrors } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { YesNoSection } from "~/components/will-forms/components/YesNoSection";
import { AddressInput } from "~/components/AddressInput";
import { AddressSchema, getInitialAddressLine } from "~/utils/addresses";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  initialChoiceValue: boolean | null;
  clearGuardians: () => void;
  setEmptyGuardians: () => void;
  initialGuardianAddress: AddressSchema | null;
  initialBackupGuardianAddress: AddressSchema | null;
  errors: FieldErrors<FieldValues>;
};

export function GuardianFormSection({
  control,
  initialChoiceValue,
  clearGuardians,
  setEmptyGuardians,
  initialGuardianAddress,
  initialBackupGuardianAddress,
  errors,
}: Props) {
  const initialHasKids = useMemo(() => {
    if (typeof initialChoiceValue === "boolean") {
      return initialChoiceValue ? "yes" : "no";
    }
    return null;
  }, [initialChoiceValue]);

  return (
    <YesNoSection
      title="Do you have kids?"
      initialValue={initialHasKids}
      onClickNo={clearGuardians}
      onClickYes={setEmptyGuardians}
    >
      <div>
        <div className="mb-8">
          <FormSectionTitle>
            I want my kid/s to be cared for by
          </FormSectionTitle>
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <div className="flex max-w-form-2 grow flex-col">
              <div className="flex flex-col gap-4">
                <FormField
                  control={control}
                  name="guardian.fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Full legal name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AddressInput
                  formFieldPrefix="guardian.address"
                  initialValue={getInitialAddressLine(initialGuardianAddress)}
                  errors={errors?.guardian?.address}
                />
              </div>
            </div>
            <div className="font-light text-brand-gray lg:max-w-[200px]">
              Consider appointing the other biological parent.
            </div>
          </div>
        </div>
        <div className="mb-8">
          <FormSectionTitle className="mb-1">
            I want the backup Carer to be
          </FormSectionTitle>
          <p className="mb-4 text-brand-gray">
            If your nominated Carer above can&apos;t or won&apos;t act as Carer,
            this person will
          </p>
          <div className="flex max-w-form-2 flex-col gap-4">
            <FormField
              control={control}
              name="backupGuardian.fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full legal name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AddressInput
              formFieldPrefix="backupGuardian.address"
              initialValue={getInitialAddressLine(initialBackupGuardianAddress)}
              errors={errors?.backupGuardian?.address}
            />
          </div>
        </div>
        <div>
          <FormSectionTitle>
            I want my kids to receive their inheritance at
          </FormSectionTitle>
          <div className="flex flex-col justify-between gap-4 lg:flex-row">
            <div>
              <FormField
                control={control}
                name="inheritanceAge"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px] text-brand-gray">
                          <SelectValue placeholder="Age" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="18">18</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="font-light text-brand-gray lg:max-w-[200px]">
              Your Executor will manage your kids inheritance until this age.
            </div>
          </div>
        </div>
      </div>
    </YesNoSection>
  );
}
