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
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { Checkbox } from "~/components/ui/checkbox";
import { AddressInput } from "~/components/AddressInput";
import {
  AddressSchema,
  EMPTY_ADDRESS,
  getInitialAddressLine,
} from "~/utils/addresses";
import { useExecutorPeopleOptions } from "~/hooks/useExecutorPeopleOptions";
import { cn } from "~/libs/utils";
import { FieldValues } from "../../schema";
import { ProfessionalAsExecutor } from "./ProfessionalAsExecutor";
import { BackupExecutor } from "./BackupExecutor";

type Props = {
  control: Control<FieldValues>;
  toggleProfessionalExecutor: (professionalAsExecutor: boolean) => void;
  toggleProfessionalBackupExecutor: (professionalAsExecutor: boolean) => void;
  togglePartnerExecutor: (partnerAsExecutor: boolean) => void;
  partner: FieldValues["partner"];
  guardian: FieldValues["guardian"];
  backupGuardian: FieldValues["backupGuardian"];
  partnerAsExecutor: boolean;
  professionalAsExecutor: boolean;
  professionalAsBackupExecutor: boolean;
  clearBackupExecutor: () => void;
  errors: FieldErrors<FieldValues>;
  initialExecutor: { fullName: string; address: AddressSchema; email: string };
  initialBackupExecutor?: {
    fullName: string;
    address: AddressSchema;
    email: string;
  };
  setFormValue: UseFormSetValue<FieldValues>;
  executor: FieldValues["executor"];
  backupExecutor: FieldValues["backupExecutor"];
};

export function ExecutorFormSection({
  control,
  partner,
  guardian,
  backupGuardian,
  toggleProfessionalExecutor,
  toggleProfessionalBackupExecutor,
  togglePartnerExecutor,
  partnerAsExecutor,
  professionalAsExecutor,
  professionalAsBackupExecutor,
  clearBackupExecutor,
  errors,
  initialExecutor,
  initialBackupExecutor,
  setFormValue,
  executor,
  backupExecutor,
}: Props) {
  const executorAddressRef = useRef<{ clearInputValue: () => void }>(null);

  const {
    shouldRenderPartnerOption,
    shouldRenderGuardianOption,
    shouldRenderBackupExecutorOption,
    setGuardianAsExecutor,
    setBackupGuardianAsExecutor,
    shouldRenderEmailInput,
    guardianAsExecutor,
    backupGuardianAsExecutor,
    hasPeopleOptions,
  } = useExecutorPeopleOptions({
    partner,
    guardian,
    backupGuardian,
    initialExecutor,
    partnerAsExecutor,
    executor,
  });

  const handleClearExecutor = () => {
    setFormValue("executor.fullName", "");
    setFormValue("executor.address", EMPTY_ADDRESS);
    setFormValue("executor.email", "");
    executorAddressRef.current?.clearInputValue();
  };

  if (professionalAsExecutor) {
    return (
      <ProfessionalAsExecutor
        control={control}
        onToggle={toggleProfessionalExecutor}
      />
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
          {shouldRenderPartnerOption() && (
            <div className="mb-4">
              <PersonOption
                personName={`My Partner, ${partner.fullName}`}
                isChecked={partnerAsExecutor}
                onClick={(checked: boolean) => {
                  if (checked) {
                    togglePartnerExecutor(true);
                    setGuardianAsExecutor(false);
                    setBackupGuardianAsExecutor(false);
                    setFormValue("executor.email", "");
                  } else {
                    togglePartnerExecutor(false);
                    handleClearExecutor();
                  }
                }}
              />
            </div>
          )}
          {shouldRenderGuardianOption() && (
            <div className="mb-4">
              <PersonOption
                personName={guardian.fullName}
                isChecked={guardianAsExecutor}
                onClick={(checked: boolean) => {
                  if (checked) {
                    setGuardianAsExecutor(true);
                    togglePartnerExecutor(false);
                    setBackupGuardianAsExecutor(false);
                    toggleProfessionalExecutor(false);
                    setFormValue("executor.fullName", guardian.fullName);
                    setFormValue("executor.address", guardian.address);
                    setFormValue("executor.email", "");
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
                    togglePartnerExecutor(false);
                    setGuardianAsExecutor(false);
                    toggleProfessionalExecutor(false);
                    setFormValue("executor.fullName", backupGuardian.fullName);
                    setFormValue("executor.address", backupGuardian.address);
                    setFormValue("executor.email", "");
                  } else {
                    setBackupGuardianAsExecutor(false);
                    togglePartnerExecutor(false);
                    toggleProfessionalExecutor(false);
                    handleClearExecutor();
                  }
                }}
              />
            </div>
          )}
          {!shouldRenderEmailInput && hasPeopleOptions ? (
            <div className="mb-4 text-brand-gray">Or</div>
          ) : null}
          <div>
            <div
              className={cn(
                "mb-4 flex flex-col gap-4",
                shouldRenderEmailInput && "hidden"
              )}
            >
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
                initialValue={getInitialAddressLine(initialExecutor.address)}
                onInputChange={() => toggleProfessionalExecutor(false)}
                errors={errors?.executor?.address}
              />
            </div>
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
          <div className={cn(shouldRenderEmailInput && "hidden")}>
            <div className="mb-4 mt-4 text-brand-gray">Or</div>
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
          </div>
        </div>
        <div className="font-light text-brand-gray lg:max-w-[200px]">
          We will email your Executor to inform them of their role.
        </div>
      </div>
      {partnerAsExecutor && (
        <BackupExecutor
          control={control}
          toggleProfessionalExecutor={toggleProfessionalExecutor}
          toggleProfessionalAsBackupExecutor={toggleProfessionalBackupExecutor}
          professionalAsBackupExecutor={professionalAsBackupExecutor}
          clearBackupExecutor={clearBackupExecutor}
          initialBackupExecutor={initialBackupExecutor || undefined}
          partner={partner}
          guardian={guardian}
          backupGuardian={backupGuardian}
          errors={errors}
          setFormValue={setFormValue}
          backupExecutor={backupExecutor}
        />
      )}
    </div>
  );
}
