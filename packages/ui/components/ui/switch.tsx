"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@ui/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer whl-inline-flex whl-h-6 whl-w-11 whl-shrink-0 whl-cursor-pointer whl-items-center whl-rounded-full whl-border-2 whl-border-transparent whl-transition-colors focus-visible:whl-outline-none focus-visible:whl-ring-2 focus-visible:whl-ring-ring focus-visible:whl-ring-offset-2 focus-visible:whl-ring-offset-background disabled:whl-cursor-not-allowed disabled:whl-opacity-50 data-[state=checked]:whl-bg-primary data-[state=unchecked]:whl-bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "whl-pointer-events-none whl-block whl-h-5 whl-w-5 whl-rounded-full whl-bg-background whl-shadow-lg whl-ring-0 whl-transition-transform data-[state=checked]:whl-translate-x-5 data-[state=unchecked]:whl-translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
