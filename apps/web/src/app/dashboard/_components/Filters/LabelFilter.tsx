"use client";

import { redirect } from "next/navigation";
import { Palette } from "lucide-react";

import type { Label } from "@whl/db";
import { Button } from "@whl/ui/components/ui/Button";

import FilterPopover from "./FilterPopup";

interface Props {
  labels: Label[];
}
const LabelFilter = ({ labels }: Props) => {
  return (
    <FilterPopover
      target="Label"
      items={labels.map((label) => ({
        id: label.id,
        label: !label.name ? "No Name" : label.name,
        icon: (
          <div
            className={`whl-h-3 whl-w-3 whl-rounded-full`}
            style={{ backgroundColor: label.color }}
          />
        ),
      }))}
      onClose={(selected) => {
        console.log(selected);
        redirect(
          `/dashboard?labels=${selected.map((item) => item.id).join(",")}`,
        );
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
