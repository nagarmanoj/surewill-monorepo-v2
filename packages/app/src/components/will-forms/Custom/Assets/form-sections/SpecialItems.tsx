import React, { useMemo } from "react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormSetValue,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { AddRemoveButton } from "~/components/will-forms/components/AddRemoveButton";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { AddressInput } from "~/components/AddressInput";
import { useFormPeople } from "~/hooks/useFormPeople";
import { cn } from "~/libs/utils";
import { EMPTY_ADDRESS, getInitialAddressLine } from "~/utils/addresses";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  setFormValue: UseFormSetValue<FieldValues>;
  peopleOptions: any[];
  errors: FieldErrors<FieldValues>;
};

export function SpecialItemsSection({
  control,
  peopleOptions,
  setFormValue,
  errors,
}: Props) {
  const { fields, remove, append } = useFieldArray({
    name: "specialItems",
    control,
    keyName: "index",
  });

  const initialFormPeople = useMemo(
    () =>
      fields
        .map((field) => {
          const personSelected = peopleOptions.find(
            (person) => person.fullName === field.fullName
          );
          if (!personSelected) return null;
          return {
            formIndex: field.index,
            personName: personSelected?.fullName,
          };
        })
        .filter(Boolean) as Array<{ formIndex: string; personName: string }>,
    [fields, peopleOptions]
  );

  const {
    isPersonSelected,
    selectPerson,
    fieldHasPersonSelected,
    clearSelectedPerson,
  } = useFormPeople(initialFormPeople);

  return (
    <div className="mb-8">
      <FormSectionTitle>I want some special items to go to</FormSectionTitle>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="w-full max-w-form-2">
          {fields.map((specialItem, fieldIndex) => (
            <div key={specialItem.index} className="mb-4 last-of-type:mb-2">
              <div className="flex flex-col gap-1">
                {peopleOptions
                  .filter((person) => {
                    if (fieldHasPersonSelected(specialItem.index)) {
                      return isPersonSelected(
                        specialItem.index,
                        person.fullName
                      );
                    }
                    return true;
                  })
                  .map((person, personIndex) => (
                    <PersonOption
                      key={personIndex}
                      personName={person.fullName}
                      isChecked={isPersonSelected(
                        specialItem.index,
                        person.fullName
                      )}
                      onClick={(checked: boolean) => {
                        if (checked) {
                          setFormValue(
                            `specialItems.${fieldIndex}.fullName`,
                            person.fullName
                          );
                          setFormValue(
                            `specialItems.${fieldIndex}.address`,
                            person.address
                          );
                          selectPerson(specialItem.index, person.fullName);
                        }
                      }}
                    />
                  ))}
              </div>
              {!fieldHasPersonSelected(specialItem.index) &&
              peopleOptions.length ? (
                <div className="mb-4 mt-2 text-brand-gray">Or</div>
              ) : null}
              <div className="mb-4 flex flex-col gap-4">
                <FormField
                  control={control}
                  name={`specialItems.${fieldIndex}.fullName`}
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        fieldHasPersonSelected(specialItem.index) && "hidden"
                      )}
                    >
                      <FormControl>
                        <Input placeholder="Full legal name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className={cn(
                    fieldHasPersonSelected(specialItem.index) && "hidden"
                  )}
                >
                  <AddressInput
                    initialValue={getInitialAddressLine(specialItem.address)}
                    formFieldPrefix={`specialItems.${fieldIndex}.address`}
                    errors={errors?.specialItems?.[fieldIndex]?.address}
                  />
                </div>
                <FormField
                  control={control}
                  name={`specialItems.${fieldIndex}.itemDescription`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Item description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {specialItem.fullName || fields.length > 1 ? (
                  <AddRemoveButton
                    action="remove"
                    onClick={() => {
                      clearSelectedPerson(specialItem.index);
                      remove(fieldIndex);
                    }}
                  >
                    Remove item
                  </AddRemoveButton>
                ) : null}
              </div>
            </div>
          ))}
          <AddRemoveButton
            action="add"
            onClick={() => {
              append({
                fullName: "",
                address: EMPTY_ADDRESS,
                itemDescription: "",
              });
            }}
          >
            Add another item
          </AddRemoveButton>
        </div>
        <div className="flex flex-col justify-between lg:max-w-[200px]">
          <p className=" font-light text-brand-gray">
            Items such as jewellery, art, military medals, etc.
          </p>
          <p className="font-light text-brand-gray">
            eg. my silver engagement ring or my Red Mustang with registration
            XYZ123
          </p>
        </div>
      </div>
    </div>
  );
}
