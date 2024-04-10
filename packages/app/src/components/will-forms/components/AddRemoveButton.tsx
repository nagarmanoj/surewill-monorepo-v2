import { ReactNode } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/libs/utils";

type Props = {
  action: "add" | "remove";
  onClick: () => void;
  children: ReactNode;
};

export function AddRemoveButton({ action, onClick, children }: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "min-w-min justify-start px-0 text-base text-brand-purple",
        action === "remove" && "-mt-3"
      )}
      onClick={onClick}
    >
      {action === "add" ? (
        <PlusCircle className="text-brand-purple" />
      ) : (
        <MinusCircle className="text-brand-purple" />
      )}
      <div className="ml-2 whitespace-nowrap">{children}</div>
    </Button>
  );
}
