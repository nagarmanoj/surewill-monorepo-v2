import { Control, FieldErrors } from "react-hook-form";
import { PartnerWithAssets } from "~/components/will-forms/components/PartnerWithAssets";
import { AddressSchema } from "~/utils/addresses";
import { FieldValues } from "../schema";

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
    <div className="flex flex-col justify-between gap-4 lg:flex-row">
      <div className="max-w-form-2">
        <PartnerWithAssets
          control={control}
          initialPartnerAddress={initialPartnerAddress}
          errors={errors}
        />
      </div>
      <div className="font-light text-brand-gray lg:mt-10 lg:max-w-[200px]">
        If your Partner does not survive you, your kid/s will receive your
        assets.
      </div>
    </div>
  );
}
