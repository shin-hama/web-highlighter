"use client";

import * as React from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { Dialog, DialogContent } from "@whl/ui/components/ui/dialog";
import { cn } from "@whl/ui/lib/utils";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "whl-flex whl-h-full whl-w-full whl-flex-col whl-overflow-hidden whl-rounded-md whl-bg-popover whl-text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

type CommandDialogProps = DialogProps;

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="whl-overflow-hidden whl-p-0 whl-shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:whl-px-2 [&_[cmdk-group-heading]]:whl-font-medium [&_[cmdk-group-heading]]:whl-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:whl-pt-0 [&_[cmdk-group]]:whl-px-2 [&_[cmdk-input-wrapper]_svg]:whl-h-5 [&_[cmdk-input-wrapper]_svg]:whl-w-5 [&_[cmdk-input]]:whl-h-12 [&_[cmdk-item]]:whl-px-2 [&_[cmdk-item]]:whl-py-3 [&_[cmdk-item]_svg]:whl-h-5 [&_[cmdk-item]_svg]:whl-w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="whl-flex whl-items-center whl-border-b whl-px-3"
    // eslint-disable-next-line react/no-unknown-property
    cmdk-input-wrapper=""
  >
    <Search className="whl-mr-2 whl-h-4 whl-w-4 whl-shrink-0 whl-opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "whl-flex whl-h-11 whl-w-full whl-rounded-md whl-bg-transparent whl-py-3 whl-text-sm whl-outline-none placeholder:whl-text-muted-foreground disabled:whl-cursor-not-allowed disabled:whl-opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "whl-max-h-[300px] whl-overflow-y-auto whl-overflow-x-hidden",
      className,
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="whl-py-6 whl-text-center whl-text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "whl-overflow-hidden whl-p-1 whl-text-foreground [&_[cmdk-group-heading]]:whl-px-2 [&_[cmdk-group-heading]]:whl-py-1.5 [&_[cmdk-group-heading]]:whl-text-xs [&_[cmdk-group-heading]]:whl-font-medium [&_[cmdk-group-heading]]:whl-text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("whl--mx-1 whl-h-px whl-bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "whl-relative whl-flex whl-cursor-default whl-select-none whl-items-center whl-rounded-sm whl-px-2 whl-py-1.5 whl-text-sm whl-outline-none aria-selected:whl-bg-accent aria-selected:whl-text-accent-foreground data-[disabled]:whl-pointer-events-none data-[disabled]:whl-opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "whl-ml-auto whl-text-xs whl-tracking-widest whl-text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
