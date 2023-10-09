"use client";

import { useCallback, useState } from "react";
import type { PropsWithChildren } from "react";

import { Checkbox } from "@whl/ui/components/ui/checkbox";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@whl/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@whl/ui/components/ui/popover";

interface Item {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
interface Props {
  target: string;
  items: Item[];
  defaultSelected?: Item[];
  onClose?: (selected: Item[]) => void;
}
const FilterPopover = ({
  target,
  items,
  defaultSelected,
  children,
  onClose,
}: PropsWithChildren<Props>) => {
  const [selected, setSelected] = useState<Item[]>(defaultSelected ?? []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open === false) {
        onClose?.(selected);
      }
    },
    [selected, onClose],
  );

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="whl-w-64">
        <Command>
          <CommandList>
            <CommandGroup heading={target.toUpperCase()}>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => {
                    setSelected((prev) => {
                      if (prev.includes(item)) {
                        return prev.filter((i) => i !== item);
                      }
                      return [...prev, item];
                    });
                  }}
                  className="whl-gap-2"
                >
                  <Checkbox checked={selected.includes(item)} />
                  {item.icon}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
