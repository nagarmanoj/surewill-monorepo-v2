import React, { useMemo } from "react";
import {
  useFieldArray,
  Control,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { useFormPeople } from "~/hooks/useFormPeople";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { AddRemoveButton } from "~/components/will-forms/components/AddRemoveButton";
import { YesNoSection } from "~/components/will-forms/components/YesNoSection";
import { getInitialPetsChoiceValue } from "~/components/will-forms/utils";
import { PetType } from "~/components/will-forms/components/PetType";
import { cn } from "~/libs/utils";
import { AddressInput } from "~/components/AddressInput";
import { EMPTY_ADDRESS, getInitialAddressLine } from "~/utils/addresses";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  setFormValue: UseFormSetValue<FieldValues>;
  people: FieldValues["assetBeneficiaries"];
  initialPets: FieldValues["pets"];
  errors: FieldErrors<FieldValues>;
  isInitialCreate: boolean;
};

export function PetsFormSection({
  control,
  setFormValue,
  people,
  initialPets,
  errors,
  isInitialCreate,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: "pets",
    control,
    keyName: "index",
  });

  const peopleOptions = people.filter(
    (person) => person.fullName && person.address
  );

  const initialFormPeople = useMemo(
    () =>
      fields
        .map((field) => {
          const personSelected = peopleOptions.find(
            (person) => person.fullName === field.ownerFullName
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
    clearSelectedPeople,
    clearSelectedPerson,
  } = useFormPeople(initialFormPeople);

  return (
    <YesNoSection
      title="Do you have pets?"
      initialValue={getInitialPetsChoiceValue(isInitialCreate, initialPets)}
      onClickYes={() =>
        setFormValue("pets", [
          {
            name: "",
            type: "",
            ownerFullName: "",
            ownerAddress: EMPTY_ADDRESS,
          },
        ])
      }
      onClickNo={() => {
        clearSelectedPeople();
        setFormValue("pets", []);
      }}
    >
      <div>
        <FormSectionTitle>I want my pet to go to</FormSectionTitle>
        <div className="max-w-form-3">
          {fields.map((pet, fieldIndex) => (
            <React.Fragment key={pet.index}>
              <div className="flex flex-col gap-1">
                {peopleOptions
                  .filter((person) => {
                    if (fieldHasPersonSelected(pet.index)) {
                      return isPersonSelected(pet.index, person.fullName);
                    }
                    return true;
                  })
                  .map((person, personIndex) => (
                    <PersonOption
                      key={personIndex}
                      personName={person.fullName}
                      isChecked={isPersonSelected(pet.index, person.fullName)}
                      onClick={(checked: boolean) => {
                        if (checked) {
                          setFormValue(
                            `pets.${fieldIndex}.ownerFullName`,
                            person.fullName
                          );
                          setFormValue(
                            `pets.${fieldIndex}.ownerAddress`,
                            person.address
                          );
                          selectPerson(pet.index, person.fullName);
                        }
                      }}
                    />
                  ))}
              </div>
              {!fieldHasPersonSelected(pet.index) && peopleOptions.length ? (
                <div className="mb-4 mt-2 text-brand-gray">Or</div>
              ) : null}
              <div className="mb-4 grid grid-cols-1 gap-x-8 gap-y-4 last-of-type:mb-2 md:grid-cols-3">
                <FormField
                  control={control}
                  name={`pets.${fieldIndex}.ownerFullName`}
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        "md:col-span-2",
                        fieldHasPersonSelected(pet.index) && "hidden"
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
                    "md:col-span-2",
                    fieldHasPersonSelected(pet.index) && "hidden"
                  )}
                >
                  <AddressInput
                    initialValue={getInitialAddressLine(pet.ownerAddress)}
                    formFieldPrefix={`pets.${fieldIndex}.ownerAddress`}
                    errors={errors?.pets?.[fieldIndex]?.ownerAddress}
                  />
                </div>
                <FormField
                  control={control}
                  name={`pets.${fieldIndex}.name`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormControl className="md:col-span-2">
                        <Input placeholder="Pet name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`pets.${fieldIndex}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PetType
                          onChange={field.onChange}
                          value={field.value || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {pet.ownerFullName || fields.length > 1 ? (
                  <AddRemoveButton
                    action="remove"
                    onClick={() => {
                      clearSelectedPerson(pet.index);
                      remove(fieldIndex);
                    }}
                  >
                    Remove {pet.name || "pet"}
                  </AddRemoveButton>
                ) : null}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-x-8 gap-y-4">
          <AddRemoveButton
            action="add"
            onClick={() =>
              append({
                name: "",
                type: "",
                ownerFullName: "",
                ownerAddress: EMPTY_ADDRESS,
              })
            }
          >
            Add another pet
          </AddRemoveButton>
        </div>
      </div>
    </YesNoSection>
  );
}
