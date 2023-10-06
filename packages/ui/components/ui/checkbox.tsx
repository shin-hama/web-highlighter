"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@whl/ui/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "whl-peer whl-h-4 whl-w-4 whl-shrink-0 whl-rounded-sm whl-border whl-border-primary whl-ring-offset-background focus-visible:whl-outline-none focus-visible:whl-ring-2 focus-visible:whl-ring-ring focus-visible:whl-ring-offset-2 disabled:whl-cursor-not-allowed disabled:whl-opacity-50 data-[state=checked]:whl-bg-primary data-[state=checked]:whl-text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "whl-flex whl-items-center whl-justify-center whl-text-current",
      )}
    >
      <Check className="whl-h-4 whl-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
