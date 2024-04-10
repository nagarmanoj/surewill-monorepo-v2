import { useRef } from "react";
import { Control, FieldErrors } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { Checkbox } from "~/components/ui/checkbox";
import { AddressInput } from "~/components/AddressInput";
import { AddressSchema, getInitialAddressLine } from "~/utils/addresses";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  toggleProfessionalExecutor: (professionalAsExecutor: boolean) => void;
  toggleProfessionalBackupExecutor: (professionalAsExecutor: boolean) => void;
  togglePartnerExecutor: (partnerAsExecutor: boolean) => void;
  partner: FieldValues["partner"];
  partnerAsExecutor: boolean;
  professionalAsExecutor: boolean;
  professionalAsBackupExecutor: boolean;
  clearBackupExecutor: () => void;
  errors: FieldErrors<FieldValues>;
  initialExecutorAddress: AddressSchema;
  initialBackupExecutorAddress?: AddressSchema;
};

export function ExecutorFormSection({
  control,
  partner,
  toggleProfessionalExecutor,
  toggleProfessionalBackupExecutor,
  togglePartnerExecutor,
  partnerAsExecutor,
  professionalAsExecutor,
  professionalAsBackupExecutor,
  clearBackupExecutor,
  initialExecutorAddress,
  initialBackupExecutorAddress,
  errors,
}: Props) {
  const executorAddressRef = useRef<{ clearInputValue: () => void }>(null);

  if (professionalAsExecutor) {
    return (
      <div>
        <FormSectionTitle className="mb-2">
          I want my Will to be handled by
        </FormSectionTitle>
        <p className="mb-4 text-brand-gray">
          Enter the person who will handle your affairs after you die, called
          the Executor
        </p>
        <FormField
          control={control}
          name="professionalAsExecutor"
          render={({ field }) => (
            <FormItem className="mt-2 flex flex-col items-start space-x-6 space-y-0 md:flex-row">
              <div className="mb-4 flex items-center whitespace-nowrap md:mb-0">
                <FormControl>
                  <Checkbox
                    className="mr-2 rounded-full"
                    checked={field.value}
                    onCheckedChange={(checked: boolean) => {
                      toggleProfessionalExecutor(true);
                      executorAddressRef.current?.clearInputValue();
                      field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormLabel className="font-medium text-brand-purple">
                  Public Trustee
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  return (
    <div>
      <FormSectionTitle className="mb-2">
        I want my Will to be handled by
      </FormSectionTitle>
      <p className="mb-4 text-brand-gray">
        Enter the person who will handle your affairs after you die, called the
        Executor
      </p>
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="w-full max-w-form-2">
          {partner.fullName && partner.address.postalCode && (
            <>
              <div className="flex flex-col gap-1">
                <PersonOption
                  personName={`My Partner, ${partner.fullName}`}
                  isChecked={partnerAsExecutor}
                  onClick={(checked: boolean) => {
                    if (checked) {
                      togglePartnerExecutor(true);
                      toggleProfessionalExecutor(false);
                    } else {
                      togglePartnerExecutor(false);
                      toggleProfessionalExecutor(false);
                    }
                  }}
                />
                {!partnerAsExecutor && (
                  <div className="mb-4 text-brand-gray">Or</div>
                )}
              </div>
            </>
          )}
          {partnerAsExecutor ? (
            <FormField
              control={control}
              name="executor.email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
                      {...field}
                      onChange={(event) => {
                        toggleProfessionalExecutor(false);
                        field.onChange(event);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <div className="mb-4 flex flex-col gap-y-4">
                <FormField
                  control={control}
                  name="executor.fullName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full legal name"
                            {...field}
                            onChange={(event) => {
                              toggleProfessionalExecutor(false);
                              field.onChange(event);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <AddressInput
                  ref={executorAddressRef}
                  formFieldPrefix="executor.address"
                  initialValue={getInitialAddressLine(initialExecutorAddress)}
                  onInputChange={() => toggleProfessionalExecutor(false)}
                  errors={errors?.executor?.address}
                />
                <FormField
                  control={control}
                  name="executor.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email address"
                          type="email"
                          {...field}
                          onChange={(event) => {
                            toggleProfessionalExecutor(false);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 text-brand-gray">Or</div>
              <FormField
                control={control}
                name="professionalAsExecutor"
                render={({ field }) => (
                  <FormItem className="mt-2 flex flex-col items-start space-x-6 space-y-0 md:flex-row">
                    <div className="mb-4 flex items-center whitespace-nowrap md:mb-0">
                      <FormControl>
                        <Checkbox
                          className="mr-2 rounded-full"
                          checked={field.value}
                          onCheckedChange={(checked: boolean) => {
                            toggleProfessionalExecutor(true);
                            executorAddressRef.current?.clearInputValue();
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-medium text-brand-purple">
                        Public Trustee
                      </FormLabel>
                    </div>
                    <div>
                      <FormDescription>
                        If you don&apos;t know who to use or simply want a
                        professional you can nominate Australian Unity
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <div className="font-light text-brand-gray lg:max-w-[200px]">
          We will email your Executor to inform them of their role.
        </div>
      </div>
      {partnerAsExecutor && (
        <div className="mt-8">
          <FormSectionTitle className="mb-2">
            I want the backup Executor to be
          </FormSectionTitle>
          <p className="mb-4 text-brand-gray">
            If your nominated Executor above can&apos;t or won&apos;t act as
            Executor, this person will
          </p>
          {professionalAsBackupExecutor ? (
            <FormField
              control={control}
              name="professionalAsBackupExecutor"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-x-6 space-y-0 md:flex-row">
                  <div className="mb-4 flex items-center whitespace-nowrap md:mb-0">
                    <FormControl>
                      <Checkbox
                        className="mr-2 rounded-full"
                        checked={field.value}
                        onCheckedChange={(checked: boolean) => {
                          clearBackupExecutor();
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-medium text-brand-purple">
                      Public Trustee
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div>
              <div className="mb-4 flex max-w-lg flex-col gap-y-4">
                <FormField
                  control={control}
                  name="backupExecutor.fullName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full legal name"
                            {...field}
                            onChange={(event) => {
                              toggleProfessionalBackupExecutor(false);
                              field.onChange(event);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <AddressInput
                  formFieldPrefix="backupExecutor.address"
                  initialValue={getInitialAddressLine(
                    initialBackupExecutorAddress || null
                  )}
                  onInputChange={() => toggleProfessionalBackupExecutor(false)}
                  errors={errors?.backupExecutor?.address}
                />
                <FormField
                  control={control}
                  name="backupExecutor.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email address"
                          type="email"
                          {...field}
                          onChange={(event) => {
                            toggleProfessionalBackupExecutor(false);
                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 text-brand-gray">Or</div>
              <FormField
                control={control}
                name="professionalAsBackupExecutor"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start space-x-6 space-y-0 md:flex-row">
                    <div className="mb-4 flex items-center whitespace-nowrap md:mb-0">
                      <FormControl>
                        <Checkbox
                          className="mr-2 rounded-full"
                          checked={field.value}
                          onCheckedChange={(checked: boolean) => {
                            clearBackupExecutor();
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-medium text-brand-purple">
                        Public Trustee
                      </FormLabel>
                    </div>
                    <div>
                      <FormDescription>
                        If you don&apos;t know who to use or simply want a
                        professional you can nominate Australian Unity
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
