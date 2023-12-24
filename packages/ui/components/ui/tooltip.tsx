"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@ui/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "whl-z-50 whl-overflow-hidden whl-rounded-md whl-border whl-bg-popover whl-px-3 whl-py-1.5 whl-text-sm whl-text-popover-foreground whl-shadow-md whl-animate-in whl-fade-in-0 whl-zoom-in-95 data-[state=closed]:whl-animate-out data-[state=closed]:whl-fade-out-0 data-[state=closed]:whl-zoom-out-95 data-[side=bottom]:whl-slide-in-from-top-2 data-[side=left]:whl-slide-in-from-right-2 data-[side=right]:whl-slide-in-from-left-2 data-[side=top]:whl-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
