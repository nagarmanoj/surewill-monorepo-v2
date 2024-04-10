import { Control, FieldErrors } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";
import { PartnerWithAssets } from "~/components/will-forms/components/PartnerWithAssets";
import { FieldValues } from "../schema";
import { AddressSchema } from "~/utils/addresses";

type Props = {
  control: Control<FieldValues>;
  initialPartnerAddress: AddressSchema;
  errors: FieldErrors<FieldValues>;
};

export function AssetsFormSection({
  control,
  initialPartnerAddress,
  errors,
}: Props) {
  return (
    <div>
      <div className="max-w-form-2">
        <PartnerWithAssets
          control={control}
          initialPartnerAddress={initialPartnerAddress}
          errors={errors}
        />
      </div>
      <FormField
        control={control}
        name="siblingsAfterPartner"
        render={({ field }) => (
          <FormItem className="mb-4">
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
                I want my Siblings to receive my assets, if my Partner does not
                survive me
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
