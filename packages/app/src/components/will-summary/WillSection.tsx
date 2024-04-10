import { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

type Props = {
  children: ReactNode;
};

export function WillSection({ children }: Props) {
  return (
    <div className="flex mb-6">
      <div className="mr-4 pt-1">
        <CheckCircle2 className="text-brand-green" />
      </div>
      {children}
    </div>
  );
}
