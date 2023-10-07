"use client";

import { useMemo } from "react";
import { redirect } from "next/navigation";
import { Palette } from "lucide-react";

import type { Label } from "@whl/db";
import { Button } from "@whl/ui/components/ui/Button";

import FilterPopover from "./FilterPopup";

interface Props {
  labels: Label[];
  selected?: string[];
}
const LabelFilter = ({ labels, selected }: Props) => {
  const items = useMemo(
    () =>
      labels.map((label) => ({
        id: label.id,
        label: !label.name ? "No Name" : label.name,
        icon: (
          <div
            className={`whl-h-3 whl-w-3 whl-rounded-full`}
            style={{ backgroundColor: label.color }}
          />
        ),
      })),
    [labels],
  );
  return (
    <FilterPopover
      target="Label"
      items={items}
      defaultSelected={items.filter(
        (item) => selected?.includes(item.id) ?? false,
      )}
      onClose={(selected) => {
        console.log(selected);
        const params = new URLSearchParams(window.location.search);
        if (selected.length !== 0) {
          params.set("labels", selected.map((item) => item.id).join(","));
        } else {
          params.delete("labels");
        }

        redirect(`/dashboard?${params.toString()}`);
      }}
    >
      <Button variant="ghost">
        <div className="whl-flex whl-flex-row whl-items-center whl-gap-1 whl-font-bold">
          <Palette />
          Label
        </div>
      </Button>
    </FilterPopover>
  );
};

export default LabelFilter;
