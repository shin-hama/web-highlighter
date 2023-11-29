"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@ui/lib/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "whl-flex whl-h-10 whl-w-full whl-items-center whl-justify-between whl-rounded-md whl-border whl-border-input whl-bg-background whl-px-3 whl-py-2 whl-text-sm whl-ring-offset-background placeholder:whl-text-muted-foreground focus:whl-outline-none disabled:whl-cursor-not-allowed disabled:whl-opacity-50 [&>span]:whl-line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="whl-h-4 whl-w-4 whl-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "whl-flex whl-cursor-default whl-items-center whl-justify-center whl-py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="whl-h-4 whl-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "whl-flex whl-cursor-default whl-items-center whl-justify-center whl-py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="whl-h-4 whl-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "whl-relative whl-z-50 whl-max-h-96 whl-min-w-[8rem] whl-overflow-hidden whl-rounded-md whl-border whl-bg-popover whl-text-popover-foreground whl-shadow-md data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-fade-out-0 data-[state=open]:whl-fade-in-0 data-[state=closed]:whl-zoom-out-95 data-[state=open]:whl-zoom-in-95 data-[side=bottom]:whl-slide-in-from-top-2 data-[side=left]:whl-slide-in-from-right-2 data-[side=right]:whl-slide-in-from-left-2 data-[side=top]:whl-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:whl-translate-y-1 data-[side=left]:whl--translate-x-1 data-[side=right]:whl-translate-x-1 data-[side=top]:whl--translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "whl-p-1",
          position === "popper" &&
            "whl-h-[var(--radix-select-trigger-height)] whl-w-full whl-min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "whl-py-1.5 whl-pl-8 whl-pr-2 whl-text-sm whl-font-semibold",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "whl-relative whl-flex whl-w-full whl-cursor-default whl-select-none whl-items-center whl-rounded-sm whl-py-1.5 whl-pl-8 whl-pr-2 whl-text-sm whl-outline-none focus:whl-bg-accent focus:whl-text-accent-foreground data-[disabled]:whl-pointer-events-none data-[disabled]:whl-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="whl-absolute whl-left-2 whl-flex whl-h-3.5 whl-w-3.5 whl-items-center whl-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="whl-h-4 whl-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("whl--mx-1 whl-my-1 whl-h-px whl-bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
