import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/libs/utils";

type Props = {
  name: string;
  description: string;
  amount: number;
  isSelected: boolean;
  onClick: () => void;
};

export function ProductOption({
  name,
  description,
  amount,
  isSelected,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 rounded-md border-2 border-brand-purple bg-white p-4 md:w-[285px]",
        isSelected && "border-brand-green bg-brand-green/30"
      )}
    >
      <div className="text-2xl">{name}</div>
      <div className="text-2xl text-brand-gray">
        ${amount} <span className="text-sm">inc.GST</span>
      </div>
      <p className="text-brand-gray">{description}</p>
      <Button
        className={cn(
          "justify-start",
          isSelected && "bg-brand-green hover:bg-brand-green"
        )}
        onClick={onClick}
      >
        {isSelected && <Check className="mr-2" />}
        {isSelected ? "Selected" : "Select"}
      </Button>
    </div>
  );
}
