import { useId } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/libs/utils";

type Props = {
  personName: string;
  isChecked: boolean;
  onClick: (checked: boolean) => void;
};

export function PersonOption({ personName, isChecked, onClick }: Props) {
  const checkboxId = useId();
  return (
    <div className={cn("flex items-center mb-2", isChecked && "mb-4")}>
      <Checkbox
        id={checkboxId}
        className="rounded-full mr-2"
        onCheckedChange={onClick}
        checked={isChecked}
      />
      <label htmlFor={checkboxId} className="text-brand-purple font-medium">
        {personName}
      </label>
    </div>
  );
}
