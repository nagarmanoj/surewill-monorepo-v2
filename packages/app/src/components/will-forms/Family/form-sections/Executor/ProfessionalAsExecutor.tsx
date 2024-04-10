import { useRef } from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";
import { FormSectionTitle } from "~/components/will-forms/components/FormSectionTitle";
import { FieldValues } from "../../schema";

type Props = {
  control: Control<FieldValues>;
  onToggle: (professionalAsExecutor: boolean) => void;
};

export function ProfessionalAsExecutor({ control, onToggle }: Props) {
  const backupExecutorAddressRef = useRef<{ clearInputValue: () => void }>(
    null
  );

  return (
    <div>
      <FormSectionTitle className="mb-2">
        I want my Will to be handled by
      </FormSectionTitle>
      <p className="mb-4 text-brand-gray">
        Enter the person who will handle your affairs after you die, called the
        Executor
      </p>
      <FormField
        control={control}
        name="professionalAsExecutor"
        render={({ field }) => (
          <FormItem className="mt-2 flex flex-col items-start space-x-6 space-y-0 md:flex-row">
            <div className="mb-4 flex items-center whitespace-nowrap md:mb-0">
              <FormControl>
                <Checkbox
                  className="mr-2 rounded-full"
                  checked={field.value}
                  onCheckedChange={(checked: boolean) => {
                    onToggle(true);
                    backupExecutorAddressRef.current?.clearInputValue();
                    field.onChange(checked);
                  }}
                />
              </FormControl>
              <FormLabel className="font-medium text-brand-purple">
                Public Trustee
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
