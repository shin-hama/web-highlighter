"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@whl/ui/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("whl-border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="whl-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "whl-flex whl-flex-1 whl-items-center whl-justify-between whl-py-4 whl-font-medium whl-transition-all hover:whl-underline [&[data-state=open]>svg]:whl-rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="whl-h-4 whl-w-4 whl-shrink-0 whl-transition-transform whl-duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "whl-overflow-hidden whl-text-sm whl-transition-all data-[state=closed]:whl-animate-accordion-up data-[state=open]:whl-animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="whl-pb-4 whl-pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
