"use client";

import { useMemo } from "react";
import { redirect } from "next/navigation";
import { Palette } from "lucide-react";
import useSWR from "swr";

import type { Label } from "@whl/db";
import { Button } from "@whl/ui/components/ui/button";

import FilterPopover from "./FilterPopup";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  selected?: string[];
}
const LabelFilter = ({ selected }: Props) => {
  const { data } = useSWR<Label[]>("/api/labels", fetcher);
  const items = useMemo(
    () =>
      (data ?? []).map((label) => ({
        id: label.id,
        label: !label.name ? "No Name" : label.name,
        icon: (
          <div
            className={`whl-h-3 whl-w-3 whl-rounded-full`}
            style={{ backgroundColor: label.color }}
          />
        ),
      })),
    [data],
  );

  const handleClose = (selected: string[]) => {
    const params = new URLSearchParams(window.location.search);
    if (selected.length !== 0) {
      params.set("labels", selected.join(","));
    } else {
      params.delete("labels");
    }

    // search query が同じ時はリダイレクトしない
    if (params.toString() !== window.location.search.slice(1)) {
      redirect(`/dashboard?${params.toString()}`);
    }
  };

  return (
    <FilterPopover
      target="Label"
      items={items}
      defaultSelected={items.filter(
        (item) => selected?.includes(item.id) ?? false,
      )}
      onClose={(selected) => handleClose(selected.map((item) => item.id))}
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
