import * as React from "react";
import { cn } from "~/libs/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "text-md flex h-[44px] w-full rounded-[8px] border-[1.5px] border-brand-purple bg-white px-3 py-2 placeholder:text-brand-gray invalid:border-error focus-within:border-brand-green focus:font-medium focus-visible:border-brand-green focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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

export { Input };
