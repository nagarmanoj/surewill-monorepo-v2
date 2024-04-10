import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { AddRemoveButton } from "~/components/will-forms/components/AddRemoveButton";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { PercentageSelect } from "~/components/PercentageSelect";
import { TotalAssets } from "~/components/TotalAssets";
import { AddressInput } from "~/components/AddressInput";
import { EMPTY_ADDRESS, getInitialAddressLine } from "~/utils/addresses";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
  assetPercentageAssigned: number;
  errors: FieldErrors<FieldValues>;
};

export function AssetBeneficiaries({
  control,
  assetPercentageAssigned,
  errors,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: "assetBeneficiaries",
    control,
    keyName: "index",
  });

  return (
    <div>
      <FormSectionTitle>I want my assets to go to</FormSectionTitle>
      <div className="flex flex-col justify-between gap-2 lg:flex-row">
        <div className="w-full max-w-form-2">
          <div>
            {fields.map((beneficiary, index) => (
              <div
                key={beneficiary.index}
                className="mb-4 grid grid-cols-1 gap-x-8 gap-y-4 last-of-type:mb-2 md:grid-cols-2"
              >
                <FormField
                  control={control}
                  name={`assetBeneficiaries.${index}.fullName`}
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
                    formFieldPrefix={`assetBeneficiaries.${index}.address`}
                    initialValue={getInitialAddressLine(beneficiary.address)}
                    errors={errors?.assetBeneficiaries?.[index]?.address}
                  />
                </div>
                <FormField
                  control={control}
                  name={`assetBeneficiaries.${index}.percentageAssets`}
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
                  <div className="flex items-end justify-end">
                    <AddRemoveButton
                      action="remove"
                      onClick={() => remove(index)}
                    >
                      Remove {beneficiary.fullName || "person"}
                    </AddRemoveButton>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[2fr_1fr] gap-x-8 gap-y-4">
            <div className="flex items-center justify-between">
              <AddRemoveButton
                action="add"
                onClick={() =>
                  append({
                    fullName: "",
                    address: EMPTY_ADDRESS,
                    percentageAssets: "",
                  })
                }
              >
                Add another person
              </AddRemoveButton>
            </div>
            <TotalAssets assetPercentageAssigned={assetPercentageAssigned} />
          </div>
        </div>
        <div className="font-light text-brand-gray lg:max-w-[200px]">
          You can choose to list one or more adults to receive your assets.
        </div>
      </div>
    </div>
  );
}
