import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Highlight({ children }: Props) {
  return (
    <span className="font-semibold underline decoration-dashed decoration-brand-blue-light underline-offset-4">
      {children}
    </span>
  );
}
