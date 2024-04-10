import { useRef } from "react";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { Checkbox } from "~/components/ui/checkbox";
import { AddressInput } from "~/components/AddressInput";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { useExecutorPeopleOptions } from "~/hooks/useExecutorPeopleOptions";
import {
  AddressSchema,
  EMPTY_ADDRESS,
  getInitialAddressLine,
} from "~/utils/addresses";
import { FieldValues } from "../../schema";
import { cn } from "~/libs/utils";

type Props = {
  control: Control<FieldValues>;
  partner: FieldValues["partner"];
  guardian: FieldValues["guardian"];
  backupGuardian: FieldValues["backupGuardian"];
  professionalAsBackupExecutor: boolean;
  clearBackupExecutor: () => void;
  toggleProfessionalAsBackupExecutor: (
    professionalAsBackupExecutor: boolean
  ) => void;
  toggleProfessionalExecutor: (professionalAsExecutor: boolean) => void;
  initialBackupExecutor?: {
    fullName: string;
    address: AddressSchema;
    email: string;
  };
  errors: FieldErrors<FieldValues>;
  setFormValue: UseFormSetValue<FieldValues>;
  backupExecutor: FieldValues["backupExecutor"];
};

export function BackupExecutor({
  control,
  partner,
  guardian,
  backupGuardian,
  initialBackupExecutor,
  professionalAsBackupExecutor,
  clearBackupExecutor,
  toggleProfessionalAsBackupExecutor,
  toggleProfessionalExecutor,
  errors,
  setFormValue,
  backupExecutor,
}: Props) {
  const backupExecutorAddressRef = useRef<{ clearInputValue: () => void }>(
    null
  );

  const {
    shouldRenderGuardianOption,
    shouldRenderBackupExecutorOption,
    setGuardianAsExecutor,
    setBackupGuardianAsExecutor,
    shouldRenderEmailInput,
    guardianAsExecutor,
    backupGuardianAsExecutor,
  } = useExecutorPeopleOptions({
    partner,
    guardian,
    backupGuardian,
    initialExecutor: initialBackupExecutor,
    partnerAsExecutor: false,
    executor: backupExecutor || undefined,
  });

  const handleClearExecutor = () => {
    setFormValue("backupExecutor.fullName", "");
    setFormValue("backupExecutor.address", EMPTY_ADDRESS);
    setFormValue("backupExecutor.email", "");
    backupExecutorAddressRef.current?.clearInputValue();
  };

  return (
    <div className="mt-8">
      <FormSectionTitle className="mb-2">
        I want the backup Executor to be
      </FormSectionTitle>
      <p className="mb-4 text-brand-gray">
        If your nominated Executor above can&apos;t or won&apos;t act as
        Executor, this person will
      </p>
      <div className={cn(professionalAsBackupExecutor && "hidden")}>
        {shouldRenderGuardianOption() && (
          <div className="mb-4">
            <PersonOption
              personName={guardian.fullName}
              isChecked={guardianAsExecutor}
              onClick={(checked: boolean) => {
                if (checked) {
                  setGuardianAsExecutor(true);
                  setBackupGuardianAsExecutor(false);
                  setFormValue("backupExecutor.fullName", guardian.fullName);
                  setFormValue("backupExecutor.address", guardian.address);
                } else {
                  setGuardianAsExecutor(false);
                  handleClearExecutor();
                }
              }}
            />
          </div>
        )}
        {shouldRenderBackupExecutorOption() && (
          <div className="mb-4">
            <PersonOption
              personName={backupGuardian.fullName}
              isChecked={backupGuardianAsExecutor}
              onClick={(checked: boolean) => {
                if (checked) {
                  setBackupGuardianAsExecutor(true);
                  setGuardianAsExecutor(false);
                  setFormValue(
                    "backupExecutor.fullName",
                    backupGuardian.fullName
                  );
                  setFormValue(
                    "backupExecutor.address",
                    backupGuardian.address
                  );
                } else {
                  setBackupGuardianAsExecutor(false);
                  handleClearExecutor();
                }
              }}
            />
          </div>
        )}
        {!shouldRenderEmailInput && (
          <div className="mb-4 text-brand-gray">Or</div>
        )}
      </div>
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
                      backupExecutorAddressRef.current?.clearInputValue();
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
          <div className="mb-4 flex max-w-lg flex-col">
            <div
              className={cn(
                "mb-4 flex flex-col gap-4",
                shouldRenderEmailInput && "hidden"
              )}
            >
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
                            toggleProfessionalAsBackupExecutor(false);
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
                ref={backupExecutorAddressRef}
                formFieldPrefix="backupExecutor.address"
                initialValue={getInitialAddressLine(
                  initialBackupExecutor?.address || null
                )}
                errors={errors?.backupExecutor?.address}
                onInputChange={() => toggleProfessionalAsBackupExecutor(false)}
              />
            </div>
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
          {!shouldRenderEmailInput && (
            <>
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
                            backupExecutorAddressRef.current?.clearInputValue();
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
      )}
    </div>
  );
}
