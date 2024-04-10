import React, { useMemo } from "react";
import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { AddRemoveButton } from "~/components/will-forms/components/AddRemoveButton";
import { EMPTY_ADDRESS, getInitialAddressLine } from "~/utils/addresses";
import { YesNoSection } from "~/components/will-forms/components/YesNoSection";
import { AddressInput } from "~/components/AddressInput";
import { PetType } from "~/components/will-forms/components/PetType";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  initialChoiceValue: boolean | null;
  clearPets: () => void;
  setEmptyPets: () => void;
  errors: FieldErrors<FieldValues>;
};

export function PetsFormSection({
  control,
  initialChoiceValue,
  clearPets,
  setEmptyPets,
  errors,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: "pets",
    control,
    keyName: "index",
  });

  const initialHasPets = useMemo(() => {
    if (typeof initialChoiceValue === "boolean") {
      return initialChoiceValue ? "yes" : "no";
    }
    return null;
  }, [initialChoiceValue]);

  return (
    <YesNoSection
      title="Do you have pets?"
      initialValue={initialHasPets}
      onClickNo={clearPets}
      onClickYes={setEmptyPets}
    >
      <div>
        <div className="mb-4 text-2xl font-medium">I want my pet to go to</div>
        <div className="max-w-form-3">
          {fields.map((pet, index) => (
            <React.Fragment key={pet.index}>
              <div className="mb-4 grid grid-cols-1 gap-x-8 gap-y-4 last-of-type:mb-2 md:grid-cols-3">
                <FormField
                  control={control}
                  name={`pets.${index}.ownerFullName`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Input placeholder="Full legal name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2">
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
                    <FormItem className="md:col-span-1">
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
