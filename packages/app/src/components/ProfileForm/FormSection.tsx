import { ReactNode } from "react";

type Props = {
  heading: string;
  description: string;
  children: ReactNode;
};

export function FormSection({ heading, description, children }: Props) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-2">{heading}</h2>
      <p className="mb-4 text-base text-brand-gray">{description}</p>
      <div className="max-w-xl space-y-4">{children}</div>
    </div>
  );
}
