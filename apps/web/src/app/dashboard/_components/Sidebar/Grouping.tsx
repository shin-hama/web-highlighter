"use client";

import { Label } from "@ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";

import type { GroupingType } from "~/types";
import { GROUPING_TYPE } from "~/types";
import { useDashboardSettings } from "../../_hooks/useDashboardSettings";

/**
 * ハイライトの一覧をどの項目で Grouping するかを選択するコンポーネント
 */
const Grouping = () => {
  const [{ grouping }, { setGrouping }] = useDashboardSettings();

  return (
    <div className="whl-flex whl-w-full whl-flex-row whl-items-center whl-gap-2">
      <Label>GroupBy</Label>
      <Select
        defaultValue={grouping}
        value={grouping}
        onValueChange={(value) => setGrouping(value as GroupingType)}
      >
        <SelectTrigger className="whl-h-8 whl-w-full whl-flex-1 whl-border-muted-foreground whl-bg-inherit">
          <SelectValue placeholder="Grouping by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={GROUPING_TYPE.page}>Page</SelectItem>
            <SelectItem value={GROUPING_TYPE.tag}>Tag</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Grouping;
