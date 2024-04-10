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
import { useFormPeople } from "~/hooks/useFormPeople";
import { YesNoSection } from "~/components/will-forms/components/YesNoSection";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { AddRemoveButton } from "~/components/will-forms/components/AddRemoveButton";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { getInitialPetsChoiceValue } from "~/components/will-forms/utils";
import { AddressInput } from "~/components/AddressInput";
import { PetType } from "~/components/will-forms/components/PetType";
import { cn } from "~/libs/utils";
import { EMPTY_ADDRESS, getInitialAddressLine } from "~/utils/addresses";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  setFormValue: UseFormSetValue<FieldValues>;
  partner: FieldValues["partner"];
  initialPets: FieldValues["pets"];
  isInitialCreate: boolean;
  errors: FieldErrors<FieldValues>;
};

export function PetsFormSection({
  control,
  setFormValue,
  partner,
  initialPets,
  isInitialCreate,
  errors,
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
          if (!field.isOwnerPartner) return null;
          return {
            formIndex: field.index,
            personName: partner.fullName,
          };
        })
        .filter(Boolean) as Array<{ formIndex: string; personName: string }>,
    [fields, partner]
  );

  const {
    selectPerson,
    clearSelectedPerson,
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
              {partner.fullName && partner.address.postalCode && (
                <PersonOption
                  personName={`My Partner, ${partner.fullName}`}
                  isChecked={isPersonSelected(pet.index, partner.fullName)}
                  onClick={(checked: boolean) => {
                    if (checked) {
                      setFormValue(
                        `pets.${index}.ownerFullName`,
                        partner.fullName
                      );
                      setFormValue(
                        `pets.${index}.ownerAddress`,
                        partner.address
                      );
                      setFormValue(`pets.${index}.isOwnerPartner`, true);
                      selectPerson(pet.index, partner.fullName);
                    } else {
                      setFormValue(`pets.${index}.ownerFullName`, "");
                      setFormValue(`pets.${index}.ownerAddress`, EMPTY_ADDRESS);
                      setFormValue(`pets.${index}.isOwnerPartner`, true);
                      clearSelectedPerson(pet.index);
                    }
                  }}
                />
              )}
              {!fieldHasPersonSelected(pet.index) &&
              partner.fullName &&
              partner.address.postalCode ? (
                <div className="mb-2 text-brand-gray">Or</div>
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
                    initialValue={getInitialAddressLine(pet.ownerAddress)}
                    formFieldPrefix={`pets.${index}.ownerAddress`}
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
                    onClick={() => {
                      clearSelectedPerson(pet.index);
                      remove(index);
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
