import React, { useRef } from "react";
import { Control, FieldErrors } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { Input } from "~/components/ui/input";
import { AddressInput } from "~/components/AddressInput";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { AddressSchema, getInitialAddressLine } from "~/utils/addresses";
import { FieldValues } from "../schema";
import { cn } from "~/libs/utils";

type Props = {
  control: Control<FieldValues>;
  initialGuardianAddress: AddressSchema;
  initialBackupGuardianAddress: AddressSchema;
  partner: FieldValues["partner"];
  errors: FieldErrors<FieldValues>;
  partnerAsGuardian: boolean;
  partnerAsBackupGuardian: boolean;
  togglePartnerAsGuardian: (partnerAsGuardian: boolean) => void;
  togglePartnerAsBackupGuardian: (partnerAsBackupGuardian: boolean) => void;
};

export function GuardianFormSection({
  control,
  initialGuardianAddress,
  initialBackupGuardianAddress,
  partner,
  errors,
  partnerAsGuardian,
  partnerAsBackupGuardian,
  togglePartnerAsGuardian,
  togglePartnerAsBackupGuardian,
}: Props) {
  const guardianAddressRef = useRef<{ clearInputValue: () => void }>(null);
  const backupGuardianAddressRef = useRef<{ clearInputValue: () => void }>(
    null
  );

  const partnerOptionForGuardian = Boolean(
    partner.fullName && partner?.address?.postalCode?.length > 1
  );

  const partnerOptionForBackupGuardian =
    partnerOptionForGuardian && !partnerAsGuardian;

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row">
      <div className="flex flex-col gap-10">
        <div>
          <FormSectionTitle className="mb-4">
            I want my kid/s to be cared for by
          </FormSectionTitle>
          <div className="flex max-w-form-2 grow flex-col">
            <div className="mb-2 flex flex-col">
              {partnerOptionForGuardian && (
                <>
                  <PersonOption
                    personName={`My Partner, ${partner.fullName}`}
                    isChecked={partnerAsGuardian}
                    onClick={(checked: boolean) => {
                      if (!checked) {
                        guardianAddressRef.current?.clearInputValue();
                      }
                      togglePartnerAsGuardian(checked);
                    }}
                  />
                  {!partnerAsGuardian && (
                    <div className="mb-4 mt-2 text-brand-gray">Or</div>
                  )}
                </>
              )}
              <div className={cn(partnerAsGuardian && "hidden")}>
                <FormField
                  control={control}
                  name="guardian.fullName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input placeholder="Full legal name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AddressInput
                  ref={guardianAddressRef}
                  formFieldPrefix="guardian.address"
                  initialValue={getInitialAddressLine(initialGuardianAddress)}
                  errors={errors?.guardian?.address}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <FormSectionTitle className="mb-2">
            I want the backup Carer to be
          </FormSectionTitle>
          <p className="mb-4 text-brand-gray">
            If your nominated Carer above can&apos;t or won&apos;t act as Carer,
            this person will
          </p>
          <div className="flex max-w-form-2 grow flex-col">
            <div className="mb-2 flex flex-col">
              {partnerOptionForBackupGuardian && (
                <>
                  <PersonOption
                    personName={`My Partner, ${partner.fullName}`}
                    isChecked={partnerAsBackupGuardian}
                    onClick={(checked: boolean) => {
                      if (!checked) {
                        backupGuardianAddressRef.current?.clearInputValue();
                      }
                      togglePartnerAsBackupGuardian(checked);
                    }}
                  />
                  {!partnerAsBackupGuardian && (
                    <div className="mb-4 mt-2 text-brand-gray">Or</div>
                  )}
                </>
              )}
              <div className={cn(partnerAsBackupGuardian && "hidden")}>
                <FormField
                  control={control}
                  name="backupGuardian.fullName"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input placeholder="Full legal name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AddressInput
                  ref={backupGuardianAddressRef}
                  formFieldPrefix="backupGuardian.address"
                  initialValue={getInitialAddressLine(
                    initialBackupGuardianAddress
                  )}
                  errors={errors?.backupGuardian?.address}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-light text-brand-gray lg:mt-10 lg:max-w-[200px]">
        If not your Partner, consider appointing the other biological parent.
      </div>
    </div>
  );
}
