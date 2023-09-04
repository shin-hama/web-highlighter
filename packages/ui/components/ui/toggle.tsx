"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const toggleVariants = cva(
  "whl-inline-flex whl-items-center whl-justify-center whl-rounded-md whl-text-sm whl-font-medium whl-ring-offset-background whl-transition-colors hover:whl-bg-muted hover:whl-text-muted-foreground focus-visible:whl-outline-none focus-visible:whl-ring-2 focus-visible:whl-ring-ring focus-visible:whl-ring-offset-2 disabled:whl-pointer-events-none disabled:whl-opacity-50 data-[state=on]:whl-bg-accent data-[state=on]:whl-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "whl-bg-transparent",
        outline:
          "whl-border whl-border-input whl-bg-transparent hover:whl-bg-accent hover:whl-text-accent-foreground",
      },
      size: {
        default: "whl-h-10 whl-px-3",
        sm: "whl-h-9 whl-px-2.5",
        lg: "whl-h-11 whl-px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
