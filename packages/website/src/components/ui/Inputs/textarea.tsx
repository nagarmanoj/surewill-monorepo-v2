import * as React from "react";
import { cn } from "~/libs/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border-[1.5px] border-brand-purple bg-white text-md px-3 py-2 ring-offset-background placeholder:text-brand-gray focus-visible:outline-none  focus-within:border-brand-green focus-visible:border-brand-green focus:font-medium disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
