"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@whl/ui/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  className,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "whl-fixed whl-inset-0 whl-z-50 whl-bg-background/80 whl-backdrop-blur-sm data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-fade-out-0 data-[state=open]:whl-fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "whl-fixed whl-left-[50%] whl-top-[50%] whl-z-50 whl-grid whl-w-full whl-max-w-lg whl-translate-x-[-50%] whl-translate-y-[-50%] whl-gap-4 whl-border whl-bg-background whl-p-6 whl-shadow-lg whl-duration-200 data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-fade-out-0 data-[state=open]:whl-fade-in-0 data-[state=closed]:whl-zoom-out-95 data-[state=open]:whl-zoom-in-95 data-[state=closed]:whl-slide-out-to-left-1/2 data-[state=closed]:whl-slide-out-to-top-[48%] data-[state=open]:whl-slide-in-from-left-1/2 data-[state=open]:whl-slide-in-from-top-[48%] sm:whl-rounded-lg md:whl-w-full",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="whl-absolute whl-right-4 whl-top-4 whl-rounded-sm whl-opacity-70 whl-ring-offset-background whl-transition-opacity hover:whl-opacity-100 focus:whl-outline-none focus:whl-ring-2 focus:whl-ring-ring focus:whl-ring-offset-2 disabled:whl-pointer-events-none data-[state=open]:whl-bg-accent data-[state=open]:whl-text-muted-foreground">
        <X className="whl-h-4 whl-w-4" />
        <span className="whl-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "whl-flex whl-flex-col whl-space-y-1.5 whl-text-center sm:whl-text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "whl-text-lg whl-font-semibold whl-leading-none whl-tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("whl-text-sm whl-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
