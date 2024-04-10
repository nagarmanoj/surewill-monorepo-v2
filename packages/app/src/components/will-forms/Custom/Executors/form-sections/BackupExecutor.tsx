import React, { useRef, useState } from "react";
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
import { Checkbox } from "~/components/ui/checkbox";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { AddressInput } from "~/components/AddressInput";
import {
  AddressSchema,
  EMPTY_ADDRESS,
  getInitialAddressLine,
} from "~/utils/addresses";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  setFormValue: UseFormSetValue<FieldValues>;
  clearExecutorErrors: () => void;
  people: Array<NonNullable<FieldValues["executor"]>>;
  initialExecutorName?: string;
  initialExecutorAddress: AddressSchema | null;
  errors: FieldErrors<FieldValues>;
};

export function BackupExecutorFormSection({
  control,
  setFormValue,
  clearExecutorErrors,
  people,
  initialExecutorName,
  initialExecutorAddress,
  errors,
}: Props) {
  const backupExecutorAddressRef = useRef<{ clearInputValue: () => void }>(
    null
  );

  const initialExecutor = people.find(
    (person) => person.fullName === initialExecutorName
  );
  const [personSelected, setPersonSelected] = useState(
    initialExecutor?.fullName || ""
  );

  return (
    <div>
      <FormSectionTitle className="mb-2">
        I want the backup Executor to be
      </FormSectionTitle>
      <p className="mb-4 text-brand-gray">
        If your nominated Executor above can&apos;t or won&apos;t act as
        Executor, this person will
      </p>
      <div className="w-full max-w-form-2">
        <div className="flex flex-col gap-1">
          {people
            .filter((person) => {
              if (personSelected) {
                return person.fullName === personSelected;
              }
              return true;
            })
            .map((person, index) => {
              if (person.fullName && person.address) {
                return (
                  <React.Fragment key={index}>
                    <PersonOption
                      personName={person.fullName}
                      isChecked={personSelected === person.fullName}
                      onClick={(checked: boolean) => {
                        if (checked) {
                          setFormValue("backupExecutor", person);
                          setFormValue("professionalAsBackupExecutor", false);
                          setPersonSelected(person.fullName);
                        } else {
                          setFormValue("backupExecutor.fullName", "");
                          setFormValue("backupExecutor.address", EMPTY_ADDRESS);
                          setFormValue("backupExecutor.email", "");
                          setPersonSelected("");
                        }
                      }}
                    />
                  </React.Fragment>
                );
              }
            })}
        </div>
        {!personSelected && people.length ? (
          <div className="mb-4 mt-2 text-brand-gray">Or</div>
        ) : null}
        {personSelected ? (
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
                      setFormValue("professionalAsBackupExecutor", false);
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
                name="backupExecutor.fullName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Full legal name"
                          {...field}
                          onChange={(event) => {
                            setFormValue("professionalAsBackupExecutor", false);
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
                errors={errors?.backupExecutor?.address}
                initialValue={getInitialAddressLine(initialExecutorAddress)}
                onInputChange={() => {
                  setFormValue("professionalAsBackupExecutor", false);
                }}
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
                          setFormValue("professionalAsBackupExecutor", false);
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
                <FormItem className="mt-2 flex flex-col items-start space-x-6 space-y-0 md:flex-row">
                  <div className="mb-4 flex items-center whitespace-nowrap md:mb-0">
                    <FormControl>
                      <Checkbox
                        className="mr-2 rounded-full"
                        checked={field.value}
                        onCheckedChange={(checked: boolean) => {
                          setFormValue("backupExecutor", {
                            fullName: "",
                            address: EMPTY_ADDRESS,
                            email: "",
                          });
                          backupExecutorAddressRef.current?.clearInputValue();
                          clearExecutorErrors();
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
    </div>
  );
}
