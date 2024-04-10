import React, { useMemo } from "react";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";
import { AddRemoveButton } from "~/components/will-forms/components/AddRemoveButton";
import { Input } from "~/components/ui/input";
import { PersonOption } from "~/components/will-forms/components/PersonOption";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { AddressInput } from "~/components/AddressInput";
import { PercentageSelect } from "~/components/PercentageSelect";
import { TotalAssets } from "~/components/TotalAssets";
import { useFormPeople } from "~/hooks/useFormPeople";
import { cn } from "~/libs/utils";
import { EMPTY_ADDRESS, getInitialAddressLine } from "~/utils/addresses";
import { RESIDENTIAL_ESTATE_CHILD_BENEFICIARY } from "../utils";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  setFormValue: UseFormSetValue<FieldValues>;
  peopleOptions: any[];
  errors: FieldErrors<FieldValues>;
  assetPercentageAssigned: number;
  hasChildren: boolean;
};

export function ResidualEstateSection({
  control,
  peopleOptions,
  setFormValue,
  errors,
  assetPercentageAssigned,
  hasChildren,
}: Props) {
  const { fields, remove, append } = useFieldArray({
    name: "residualEstateBeneficiaries",
    control,
    keyName: "index",
  });

  const peopleOptionsToDisplay = useMemo(() => {
    const people = [...peopleOptions];
    if (hasChildren) {
      people.push(RESIDENTIAL_ESTATE_CHILD_BENEFICIARY);
    }
    return people;
  }, [peopleOptions, hasChildren]);

  const initialFormPeople = useMemo(
    () =>
      fields
        .map((field) => {
          const personSelected = peopleOptionsToDisplay.find(
            (person) => person.fullName === field.fullName
          );
          if (!personSelected) return null;
          return {
            formIndex: field.index,
            personName: personSelected?.fullName,
          };
        })
        .filter(Boolean) as Array<{ formIndex: string; personName: string }>,
    [fields, peopleOptionsToDisplay]
  );

  const {
    isPersonSelected,
    selectPerson,
    fieldHasPersonSelected,
    clearSelectedPerson,
  } = useFormPeople(initialFormPeople);

  return (
    <div className="mb-8">
      <FormSectionTitle className="mb-1">
        I want the bulk of my assets to go to
      </FormSectionTitle>
      <p className="mb-4 text-brand-gray">
        This is also known as your residual estate
      </p>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div>
          <div className="w-full max-w-form-2">
            {fields.map((beneficiary, fieldIndex) => (
              <div key={beneficiary.index} className="mb-4 last-of-type:mb-1">
                <div className="flex flex-col gap-1">
                  {peopleOptionsToDisplay
                    .filter((person) => {
                      if (fieldHasPersonSelected(beneficiary.index)) {
                        return isPersonSelected(
                          beneficiary.index,
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
                          beneficiary.index,
                          person.fullName
                        )}
                        onClick={(checked: boolean) => {
                          if (checked) {
                            setFormValue(
                              `residualEstateBeneficiaries.${fieldIndex}.fullName`,
                              person.fullName
                            );
                            setFormValue(
                              `residualEstateBeneficiaries.${fieldIndex}.address`,
                              person.address
                            );
                            setFormValue(
                              `residualEstateBeneficiaries.${fieldIndex}.isChildren`,
                              person.isChildren || false
                            );
                            selectPerson(beneficiary.index, person.fullName);
                          }
                        }}
                      />
                    ))}
                </div>
                {!fieldHasPersonSelected(beneficiary.index) &&
                peopleOptionsToDisplay.length ? (
                  <div className="mb-4 mt-2 text-brand-gray">Or</div>
                ) : null}
                <div className="flex flex-col gap-4">
                  <FormField
                    control={control}
                    name={`residualEstateBeneficiaries.${fieldIndex}.fullName`}
                    render={({ field }) => (
                      <FormItem
                        className={cn(
                          fieldHasPersonSelected(beneficiary.index) && "hidden"
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
                      fieldHasPersonSelected(beneficiary.index) && "hidden"
                    )}
                  >
                    <AddressInput
                      initialValue={getInitialAddressLine(beneficiary.address)}
                      formFieldPrefix={`residualEstateBeneficiaries.${fieldIndex}.address`}
                      errors={
                        errors?.residualEstateBeneficiaries?.[fieldIndex]
                          ?.address
                      }
                    />
                  </div>
                  <FormField
                    control={control}
                    name={`residualEstateBeneficiaries.${fieldIndex}.percentageAssets`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <PercentageSelect
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Percentage of assets"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                    <AddRemoveButton
                      action="remove"
                      onClick={() => {
                        clearSelectedPerson(beneficiary.index);
                        remove(fieldIndex);
                      }}
                    >
                      Remove person
                    </AddRemoveButton>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <AddRemoveButton
                action="add"
                onClick={() => {
                  append({
                    fullName: "",
                    address: EMPTY_ADDRESS,
                    percentageAssets: "",
                    isChildren: false,
                  });
                }}
              >
                Add another person
              </AddRemoveButton>
              <TotalAssets assetPercentageAssigned={assetPercentageAssigned} />
            </div>
          </div>
          <div className="mt-4">
            {hasChildren && (
              <FormField
                control={control}
                name="passResidualEstateToChildren"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <div className="mb-4 flex items-center">
                      <FormControl>
                        <Checkbox
                          className="mr-2 rounded-full"
                          checked={field.value}
                          onCheckedChange={(checked: boolean) =>
                            field.onChange(checked)
                          }
                        />
                      </FormControl>
                      <FormLabel className="font-medium text-brand-purple">
                        If this person/s does not survive me, I want my kid/s to
                        receive their share
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={control}
              name="passResidualEstateToSiblings"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <div className="flex items-center">
                    <FormControl>
                      <Checkbox
                        className="mr-2 rounded-full"
                        checked={field.value}
                        onCheckedChange={(checked: boolean) =>
                          field.onChange(checked)
                        }
                      />
                    </FormControl>
                    <FormLabel className="font-medium text-brand-purple">
                      If this person/s does not survive me, I want my sibling/s
                      to receive their share
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <p className="flex flex-col justify-between font-light text-brand-gray lg:max-w-[200px]">
          This covers assets like your house and anything not listed
          specifically in the sections below
        </p>
      </div>
    </div>
  );
}
