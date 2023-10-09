import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@ui/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "whl-inline-flex whl-items-center whl-justify-center whl-rounded-md whl-text-sm whl-font-medium whl-ring-offset-background whl-transition-colors focus-visible:whl-outline-none focus-visible:whl-ring-2 focus-visible:whl-ring-ring focus-visible:whl-ring-offset-2 disabled:whl-pointer-events-none disabled:whl-opacity-50",
  {
    variants: {
      variant: {
        default:
          "whl-bg-primary whl-text-primary-foreground hover:whl-bg-primary/90",
        destructive:
          "whl-bg-destructive whl-text-destructive-foreground hover:whl-bg-destructive/90",
        outline:
          "whl-border whl-border-input whl-bg-background hover:whl-bg-accent hover:whl-text-accent-foreground",
        secondary:
          "whl-bg-secondary whl-text-secondary-foreground hover:whl-bg-secondary/80",
        ghost: "hover:whl-bg-accent hover:whl-text-accent-foreground",
        link: "whl-text-primary whl-underline-offset-4 hover:whl-underline",
      },
      size: {
        default: "whl-h-10 whl-px-4 whl-py-2",
        sm: "whl-h-9 whl-rounded-md whl-px-3",
        lg: "whl-h-11 whl-rounded-md whl-px-8",
        icon: "whl-h-10 whl-w-10",
        icon_sm: "whl-h-8 whl-w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
