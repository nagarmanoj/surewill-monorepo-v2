import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "~/libs/utils";

const buttonVariants = cva(
  "inline-flex  w-full sm:min-w-[220px] sm:w-auto items-center whitespace-nowrap justify-between text-bold rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "border-2 border-white border-opacity-20 box-border bg-brand-purple text-white hover:bg-brand-green hover:shadow-button disabled:bg-brand-gray font-semibold",
        secondary:
          "border-2 text-brand-blue-1 border-brand-blue-1 hover:bg-brand-green-3 font-semibold",
        outline:
          "border-[1.5px] border-white bg-white/10 hover:bg-brand-green/50 text-white font-semibold text-lg",
        link: "underline-offset-4 hover:underline text-primary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-11 text-lg px-5 gap-5",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-10",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        className: "w-auto",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled = false,
      rightIcon = null,
      ...props
    },
    ref
  ) => {
    const renderRightIcon = () => {
      if (loading) return <Loader2 className="ml-2 h-5 w-5 animate-spin" />;
      return rightIcon ? <span className="ml-2">{rightIcon}</span> : null;
    };
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "!bg-brand-green-light"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {props.children}
        {renderRightIcon()}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
