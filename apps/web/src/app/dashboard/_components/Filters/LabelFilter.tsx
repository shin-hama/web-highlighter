"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@ui/components/ui/badge";
import { Palette } from "lucide-react";
import useSWR from "swr";

import type { Label } from "@whl/db";
import { Button } from "@whl/ui/components/ui/button";

import { useLabelsFilter } from "../../_hooks/useLabelsFilter";
import FilterPopover from "./FilterPopup";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LabelFilter = () => {
  const router = useRouter();
  const selected = useLabelsFilter();
  const { data } = useSWR<Label[]>("/api/labels", fetcher);
  const items = useMemo(
    () =>
      (data ?? []).map((label) => ({
        id: label.id,
        label: !label.name ? "No Name" : label.name,
        selected: selected.includes(label.id) ?? false,
        icon: (
          <div
            className={`whl-h-3 whl-w-3 whl-rounded-full`}
            style={{ backgroundColor: label.color }}
          />
        ),
      })),
    [data, selected],
  );

  const handleClose = (labels: string[]) => {
    // 既存のクエリを消さないために、現在のクエリに labels を追加する
    const params = new URLSearchParams(window.location.search);
    if (labels.length !== 0) {
      params.set("labels", labels.join(","));
    } else {
      // すでにクエリに labels があり、フィルター条件から labels をなくした場合は、URL のクエリを削除する
      params.delete("labels");
    }

    // 画面のちらつきを防ぐため search query が同じ時はリダイレクトしない
    // TODO: クエリが複数あると順番にも影響してしまうので、labels だけを比較するようにする
    if (params.toString() !== window.location.search.slice(1)) {
      router.replace(`/dashboard?${params.toString()}`);
    }
  };

  return (
    <FilterPopover
      target="Label"
      items={items}
      defaultSelected={items.filter((item) => item.selected)}
      onClose={(selected) => handleClose(selected.map((item) => item.id))}
    >
      <Button variant="ghost">
        <div className="whl-flex whl-flex-row whl-items-center whl-gap-1 whl-font-bold">
          <Palette />
          Label
          {selected && (
            <Badge className="whl-rounded-sm whl-px-2">{selected.length}</Badge>
          )}
        </div>
      </Button>
    </FilterPopover>
  );
};

export default LabelFilter;
