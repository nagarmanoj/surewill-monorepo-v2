import { useFieldArray, Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { FieldValues } from "../schema";

type Props = {
  control: Control<FieldValues>;
};

export function PetCareSection({ control }: Props) {
  const { fields } = useFieldArray({
    name: "petCare",
    control,
  });
  return (
    <div>
      {fields.map((pet, index) => (
        <div key={index} className="mb-8">
          <FormSectionTitle>
            I want {pet.ownerName} to get money to care for {pet.petName}
          </FormSectionTitle>
          <FormField
            control={control}
            name={`petCare.${index}.careMoneyAmount`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative md:max-w-[200px]">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-brand-purple">$</span>
                    </div>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step={0.01}
                      min={0}
                      className="pl-7"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
}
