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
import { Input } from "@whl/ui/components/ui/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@whl/ui/components/ui/Popover";
import { Separator } from "@whl/ui/components/ui/Separator";

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
          <Input placeholder={`Find ${target}...`}></Input>
          <div className="whl-flex whl-flex-col whl-space-y-1">
            <p>{target.toUpperCase()}</p>
            {items.map((item) => (
              <>
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
              </>
            ))}
          </div>
          <Separator />
          <Command>
            <CommandInput placeholder={`Find ${target}...`} />
            <CommandList>
              <CommandEmpty>Nothing found</CommandEmpty>
              <CommandGroup heading={target.toUpperCase()}>
                {items.map((item) => (
                  <CommandItem>
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
