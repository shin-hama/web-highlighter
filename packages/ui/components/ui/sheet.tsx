"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@ui/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "whl-fixed whl-inset-0 whl-z-50 whl-bg-background/80 whl-backdrop-blur-sm data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-fade-out-0 data-[state=open]:whl-fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "whl-fixed whl-z-50 whl-gap-4 whl-bg-background whl-p-6 whl-shadow-lg whl-transition whl-ease-in-out data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-duration-300 data-[state=open]:whl-duration-500",
  {
    variants: {
      side: {
        top: "whl-inset-x-0 whl-top-0 whl-border-b data-[state=closed]:whl-slide-out-to-top data-[state=open]:whl-slide-in-from-top",
        bottom:
          "whl-inset-x-0 whl-bottom-0 whl-border-t data-[state=closed]:whl-slide-out-to-bottom data-[state=open]:whl-slide-in-from-bottom",
        left: "whl-inset-y-0 whl-left-0 whl-h-full whl-w-3/4 whl-border-r data-[state=closed]:whl-slide-out-to-left data-[state=open]:whl-slide-in-from-left sm:whl-max-w-sm",
        right:
          "whl-inset-y-0 whl-right-0 whl-h-full whl-w-3/4 whl-border-l data-[state=closed]:whl-slide-out-to-right data-[state=open]:whl-slide-in-from-right sm:whl-max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="whl-absolute whl-right-4 whl-top-4 whl-rounded-sm whl-opacity-70 whl-ring-offset-background whl-transition-opacity hover:whl-opacity-100 focus:whl-outline-none focus:whl-ring-2 focus:whl-ring-ring focus:whl-ring-offset-2 disabled:whl-pointer-events-none data-[state=open]:whl-bg-secondary">
        <X className="whl-h-4 whl-w-4" />
        <span className="whl-sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "whl-flex whl-flex-col whl-space-y-2 whl-text-center sm:whl-text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "whl-flex whl-flex-col-reverse sm:whl-flex-row sm:whl-justify-end sm:whl-space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "whl-text-lg whl-font-semibold whl-text-foreground",
      className,
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("whl-text-sm whl-text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
