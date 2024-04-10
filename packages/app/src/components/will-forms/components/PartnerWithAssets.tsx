import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { AddressInput } from "~/components/AddressInput";
import { AddressSchema, getInitialAddressLine } from "~/utils/addresses";
import { FormSectionTitle } from "./FormSectionTitle";

type Props<TFieldValues extends {}> = {
  control: Control<TFieldValues>;
  initialPartnerAddress: AddressSchema;
  errors: any;
};

export function PartnerWithAssets<TFieldValues extends FieldValues>({
  control,
  initialPartnerAddress,
  errors,
}: Props<TFieldValues>) {
  return (
    <div className="w-full max-w-lg">
      <FormSectionTitle>I want my assets to go to my Partner</FormSectionTitle>
      <div className="mb-2">
        <div className="mb-4 flex flex-col gap-y-4">
          <FormField
            control={control}
            name={"partner.fullName" as Path<TFieldValues>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full legal name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AddressInput
            initialValue={getInitialAddressLine(initialPartnerAddress)}
            formFieldPrefix="partner.address"
            errors={errors?.partner?.address}
          />
        </div>
      </div>
    </div>
  );
}
