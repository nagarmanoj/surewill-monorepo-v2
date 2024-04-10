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
import {
  AddressSchema,
  EMPTY_ADDRESS,
  getInitialAddressLine,
} from "~/utils/addresses";
import { AddressInput } from "~/components/AddressInput";
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

export function ExecutorFormSection({
  control,
  setFormValue,
  clearExecutorErrors,
  people,
  initialExecutorName,
  initialExecutorAddress,
  errors,
}: Props) {
  const executorAddressRef = useRef<{ clearInputValue: () => void }>(null);

  const initialExecutor = people.find(
    (person) => person.fullName === initialExecutorName
  );
  const [personSelected, setPersonSelected] = useState(
    initialExecutor?.fullName || ""
  );
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
                            setFormValue("executor", person);
                            setFormValue("professionalAsExecutor", false);
                            setPersonSelected(person.fullName);
                          } else {
                            setFormValue("executor.fullName", "");
                            setFormValue("executor.address", EMPTY_ADDRESS);
                            setFormValue("executor.email", "");
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
              name="executor.email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
                      {...field}
                      onChange={(event) => {
                        setFormValue("professionalAsExecutor", false);
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
                              setFormValue("professionalAsExecutor", false);
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
                  errors={errors?.executor?.address}
                  initialValue={getInitialAddressLine(initialExecutorAddress)}
                  onInputChange={() => {
                    setFormValue("professionalAsExecutor", false);
                  }}
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
                            setFormValue("professionalAsExecutor", false);
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
                            setFormValue("executor", {
                              fullName: "",
                              address: EMPTY_ADDRESS,
                              email: "",
                            });
                            executorAddressRef.current?.clearInputValue();
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
        <div className="font-light text-brand-gray lg:max-w-[200px]">
          We will email your Executor to inform them of their role.
        </div>
      </div>
    </div>
  );
}
