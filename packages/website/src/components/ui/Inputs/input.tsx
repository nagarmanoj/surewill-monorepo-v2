import * as React from "react";
import { cn } from "~/libs/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: "normal" | "light";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, theme = "normal", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-[8px] border-[1.5px] border-brand-purple bg-white px-3 py-2 text-lg placeholder:text-brand-gray-light focus-within:border-brand-green focus-visible:border-brand-green focus-visible:outline-none focus:font-medium disabled:cursor-not-allowed disabled:opacity-50 invalid:border-error",
          theme === "light" && "bg-brand-green-extraLight focus:bg-white",
          className,
          props["aria-invalid"] && "border-error"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
