"use client";

import * as React from "react";
import { buttonVariants } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("whl-p-3", className)}
      classNames={{
        months:
          "whl-flex whl-flex-col sm:whl-flex-row whl-space-y-4 sm:whl-space-x-4 sm:whl-space-y-0",
        month: "whl-space-y-4",
        caption:
          "whl-flex whl-justify-center whl-pt-1 whl-relative whl-items-center",
        caption_label: "whl-text-sm whl-font-medium",
        nav: "whl-space-x-1 whl-flex whl-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "whl-h-7 whl-w-7 whl-bg-transparent whl-p-0 whl-opacity-50 hover:whl-opacity-100",
        ),
        nav_button_previous: "whl-absolute whl-left-1",
        nav_button_next: "whl-absolute whl-right-1",
        table: "whl-w-full whl-border-collapse whl-space-y-1",
        head_row: "whl-flex",
        head_cell:
          "whl-text-muted-foreground whl-rounded-md whl-w-9 whl-font-normal text-[0.8rem]",
        row: "whl-flex whl-w-full whl-mt-2",
        cell: "whl-text-center whl-text-sm whl-p-0 whl-relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:whl-rounded-l-md last:[&:has([aria-selected])]:whl-rounded-r-md focus-within:whl-relative focus-within:whl-z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "whl-h-9 whl-w-9 whl-p-0 whl-font-normal aria-selected:whl-opacity-100",
        ),
        day_selected:
          "whl-bg-primary whl-text-primary-foreground hover:whl-bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "whl-bg-accent whl-text-accent-foreground",
        day_outside: "whl-text-muted-foreground whl-opacity-50",
        day_disabled: "whl-text-muted-foreground whl-opacity-50",
        day_range_middle:
          "whl-aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "whl-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="whl-h-4 whl-w-4" />,
        IconRight: () => <ChevronRight className="whl-h-4 whl-w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
