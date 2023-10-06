"use client";

import { useState } from "react";
import type { PropsWithChildren } from "react";

import { Checkbox } from "@whl/ui/components/ui/Checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@whl/ui/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@whl/ui/components/ui/Popover";

interface Props {
  target: string;
  items: string[];
}
const FilterPopover = ({
  target,
  items,
  children,
}: PropsWithChildren<Props>) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="whl-w-64">
        <div className="whl-p-2">
          <Command>
            <CommandInput placeholder={`Find ${target}...`} />
            <CommandList>
              <CommandEmpty>Nothing found</CommandEmpty>
              <CommandGroup heading={target.toUpperCase()}>
                {items.map((item) => (
                  <CommandItem key={item} className="whl-gap-2">
                    <Checkbox
                      checked={selected.includes(item)}
                      onCheckedChange={(checked) => {
                        if (checked === true) {
                          setSelected((prev) => [...prev, item]);
                        } else {
                          setSelected((prev) => prev.filter((i) => i !== item));
                        }
                      }}
                    />
                    <span>{item}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
