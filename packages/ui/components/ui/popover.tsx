"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@ui/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

interface Props {
  removePortal?: boolean;
}
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & Props
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      removePortal = false,
      ...props
    },
    ref,
  ) => {
    const Wrapper = removePortal ? React.Fragment : PopoverPrimitive.Portal;
    return (
      <Wrapper>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "whl-z-50 whl-w-72 whl-rounded-md whl-border whl-bg-popover whl-p-4 whl-text-popover-foreground whl-shadow-md whl-outline-none data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-fade-out-0 data-[state=open]:whl-fade-in-0 data-[state=closed]:whl-zoom-out-95 data-[state=open]:whl-zoom-in-95 data-[side=bottom]:whl-slide-in-from-top-2 data-[side=left]:whl-slide-in-from-right-2 data-[side=right]:whl-slide-in-from-left-2 data-[side=top]:whl-slide-in-from-bottom-2",
            className,
          )}
          {...props}
        />
      </Wrapper>
    );
  },
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent };
