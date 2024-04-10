import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "~/libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-bold rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-purple text-white hover:bg-brand-green disabled:bg-brand-gray border-2 border-white border-opacity-20 hover:shadow-button hover:shadow-button",
        secondary:
          "bg-white border-[1.5px] text-brand-purple border-brand-purple hover:bg-gray-100",
        outline:
          "border-[1.5px] border-brand-blue hover:bg-brand-green-extraLight",
        link: "underline-offset-4 hover:underline text-primary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default:
          "h-[44px] min-w-full sm:min-w-[205px] rounded-[8px] text-lg px-4 whitespace-nowrap",
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
      if (loading) return <Loader2 className="ml-auto h-5 w-5 animate-spin" />;
      return rightIcon ? <span className="ml-auto">{rightIcon}</span> : null;
    };
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "!bg-brand-green-light !opacity-100"
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
