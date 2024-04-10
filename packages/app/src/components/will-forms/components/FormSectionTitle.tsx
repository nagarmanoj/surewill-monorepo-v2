import { ReactNode } from "react";
import { cn } from "~/libs/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function FormSectionTitle({ children, className }: Props) {
  return (
    <h3 className={cn("text-2xl font-medium mb-4", className)}>{children}</h3>
  );
}
