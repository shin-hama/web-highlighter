"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@whl/ui/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "whl-flex whl-cursor-default whl-select-none whl-items-center whl-rounded-sm whl-px-2 whl-py-1.5 whl-text-sm whl-outline-none focus:whl-bg-accent data-[state=open]:whl-bg-accent",
      inset && "whl-pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="whl-ml-auto whl-h-4 whl-w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "whl-z-50 whl-min-w-[8rem] whl-overflow-hidden whl-rounded-md whl-border whl-bg-popover whl-p-1 whl-text-popover-foreground whl-shadow-lg data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-fade-out-0 data-[state=open]:whl-fade-in-0 data-[state=closed]:whl-zoom-out-95 data-[state=open]:whl-zoom-in-95 data-[side=bottom]:whl-slide-in-from-top-2 data-[side=left]:whl-slide-in-from-right-2 data-[side=right]:whl-slide-in-from-left-2 data-[side=top]:whl-slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "whl-z-50 whl-min-w-[8rem] whl-overflow-hidden whl-rounded-md whl-border whl-bg-popover whl-p-1 whl-text-popover-foreground whl-shadow-md data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-fade-out-0 data-[state=open]:whl-fade-in-0 data-[state=closed]:whl-zoom-out-95 data-[state=open]:whl-zoom-in-95 data-[side=bottom]:whl-slide-in-from-top-2 data-[side=left]:whl-slide-in-from-right-2 data-[side=right]:whl-slide-in-from-left-2 data-[side=top]:whl-slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "whl-relative whl-flex whl-cursor-default whl-select-none whl-items-center whl-rounded-sm whl-px-2 whl-py-1.5 whl-text-sm whl-outline-none whl-transition-colors focus:whl-bg-accent focus:whl-text-accent-foreground data-[disabled]:whl-pointer-events-none data-[disabled]:whl-opacity-50",
      inset && "whl-pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "whl-relative whl-flex whl-cursor-default whl-select-none whl-items-center whl-rounded-sm whl-py-1.5 whl-pl-8 whl-pr-2 whl-text-sm whl-outline-none whl-transition-colors focus:whl-bg-accent focus:whl-text-accent-foreground data-[disabled]:whl-pointer-events-none data-[disabled]:whl-opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="whl-absolute whl-left-2 whl-flex whl-h-3.5 whl-w-3.5 whl-items-center whl-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="whl-h-4 whl-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "whl-relative whl-flex whl-cursor-default whl-select-none whl-items-center whl-rounded-sm whl-py-1.5 whl-pl-8 whl-pr-2 whl-text-sm whl-outline-none whl-transition-colors focus:whl-bg-accent focus:whl-text-accent-foreground data-[disabled]:whl-pointer-events-none data-[disabled]:whl-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="whl-absolute whl-left-2 whl-flex whl-h-3.5 whl-w-3.5 whl-items-center whl-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="whl-h-2 whl-w-2 whl-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "whl-px-2 whl-py-1.5 whl-text-sm whl-font-semibold",
      inset && "whl-pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("whl--mx-1 whl-my-1 whl-h-px whl-bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "whl-ml-auto whl-text-xs whl-tracking-widest whl-opacity-60",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
