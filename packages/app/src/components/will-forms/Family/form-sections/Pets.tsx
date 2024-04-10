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
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { Input } from "~/components/ui/input";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { useFormPeople } from "~/hooks/useFormPeople";
import { YesNoSection } from "~/components/will-forms/components/YesNoSection";
import { AddRemoveButton } from "~/components/will-forms/components/AddRemoveButton";
import { getInitialPetsChoiceValue } from "~/components/will-forms/utils";
import { cn } from "~/libs/utils";
import { AddressInput } from "~/components/AddressInput";
import { PetType } from "~/components/will-forms/components/PetType";
import {
  AddressSchema,
  EMPTY_ADDRESS,
  getInitialAddressLine,
} from "~/utils/addresses";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  setFormValue: UseFormSetValue<FieldValues>;
  initialPets: FieldValues["pets"];
  errors: FieldErrors<FieldValues>;
  isInitialCreate: boolean;
  peopleOptions: { fullName: string; address: AddressSchema }[];
  partner: FieldValues["partner"];
};

export function PetsFormSection({
  control,
  setFormValue,
  initialPets,
  errors,
  isInitialCreate,
  peopleOptions,
  partner,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: "pets",
    control,
    keyName: "index",
  });

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
    selectPerson,
    fieldHasPersonSelected,
    clearSelectedPeople,
    isPersonSelected,
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
            isOwnerPartner: false,
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
          {fields.map((pet, index) => (
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
                      personName={
                        partner?.fullName === person.fullName
                          ? `My Partner, ${person.fullName}`
                          : person.fullName
                      }
                      isChecked={isPersonSelected(pet.index, person.fullName)}
                      onClick={(checked: boolean) => {
                        if (checked) {
                          setFormValue(
                            `pets.${index}.ownerFullName`,
                            person.fullName
                          );
                          setFormValue(
                            `pets.${index}.ownerAddress`,
                            person.address
                          );
                          selectPerson(pet.index, person.fullName);
                          if (
                            person.fullName.toLowerCase().includes("partner")
                          ) {
                            setFormValue(`pets.${index}.isOwnerPartner`, true);
                          } else {
                            setFormValue(`pets.${index}.isOwnerPartner`, false);
                          }
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
                  name={`pets.${index}.ownerFullName`}
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
                    formFieldPrefix={`pets.${index}.ownerAddress`}
                    initialValue={getInitialAddressLine(pet.ownerAddress)}
                    errors={errors?.pets?.[index]?.ownerAddress}
                  />
                </div>
                <FormField
                  control={control}
                  name={`pets.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Input placeholder="Pet name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`pets.${index}.type`}
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
                    onClick={() => remove(index)}
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
                isOwnerPartner: false,
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
