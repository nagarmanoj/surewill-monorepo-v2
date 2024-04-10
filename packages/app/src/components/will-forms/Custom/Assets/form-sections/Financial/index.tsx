import React, { useMemo } from "react";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { AddRemoveButton } from "~/components/will-forms/components/AddRemoveButton";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { useFormPeople } from "~/hooks/useFormPeople";
import { EMPTY_ADDRESS, AddressSchema } from "~/utils/addresses";
import { FieldValues } from "../../schema";
import { FinancialBeneficiary } from "./FinancialBeneficiary";

type Props = {
  control: Control<FieldValues>;
  setFormValue: UseFormSetValue<FieldValues>;
  peopleOptions: Array<{
    id: string;
    fullName: string;
    address: AddressSchema;
  }>;
  errors: FieldErrors<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
};

export function FinancialSection({
  control,
  peopleOptions,
  setFormValue,
  errors,
  clearErrors,
}: Props) {
  const { fields, remove, append } = useFieldArray({
    name: "financialBeneficiaries",
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
      <FormSectionTitle>I want to give some money to</FormSectionTitle>
      <div className="w-full max-w-form-2">
        {fields.map((beneficiary, fieldIndex) => (
          <div key={fieldIndex} className="mb-4 last-of-type:mb-2">
            <FinancialBeneficiary
              control={control}
              setFormValue={setFormValue}
              peopleOptions={peopleOptions}
              clearErrors={clearErrors}
              fieldIndex={fieldIndex}
              errors={errors}
              address={beneficiary.address}
              fieldHasPersonSelected={fieldHasPersonSelected(beneficiary.index)}
              isInitialCharity={!!beneficiary.charityName}
              isPersonOptionSelected={(personName: string) =>
                isPersonSelected(beneficiary.index, personName)
              }
              onSelectPerson={(personName: string) =>
                selectPerson(beneficiary.index, personName)
              }
            />
            {beneficiary.fullName.length > 0 || fields.length > 1 ? (
              <AddRemoveButton
                action="remove"
                onClick={() => {
                  clearSelectedPerson(beneficiary.index);
                  remove(fieldIndex);
                }}
              >
                Remove
              </AddRemoveButton>
            ) : null}
          </div>
        ))}
        <AddRemoveButton
          action="add"
          onClick={() => {
            append({
              fullName: "",
              charityName: "",
              address: EMPTY_ADDRESS,
              moneyReceived: "0",
            });
          }}
        >
          Add another
        </AddRemoveButton>
      </div>
    </div>
  );
}
