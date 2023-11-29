"use client";

import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@ui/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  options: Option[];
  placeholder?: string;
  emptyState?: string;
  onChange: (value: string) => void;
}

export function Combobox({
  children,
  value,
  options,
  placeholder = "Search...",
  emptyState = "No results found.",
  onChange,
}: React.PropsWithChildren<Props>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="whl-w-[200px] whl-p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="whl-h-9" />
          <CommandEmpty>{emptyState}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "whl-ml-auto whl-h-4 whl-w-4",
                    value === option.value
                      ? "whl-opacity-100"
                      : "whl-opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
