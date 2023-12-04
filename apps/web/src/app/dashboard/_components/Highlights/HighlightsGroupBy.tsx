"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@ui/components/ui/scroll-area";

import { GROUPING_TYPE } from "~/types";
import { useDashboardSettings } from "../../_hooks/useDashboardSettings";
import PageList from "./PageGroup/PageList";
import TagGroup from "./TagGroup/TagGroup";

const HighlightsGroupBy = () => {
  const [settings] = useDashboardSettings();
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    console.log(settings.grouping);
    // Hydration Error が発生するため useEffect でコンポーネントをセットする
    if (settings.grouping === GROUPING_TYPE.tag) {
      setComponent(<TagGroup />);
    } else {
      setComponent(<PageList />);
    }
  }, [settings]);

  return (
    <ScrollArea className="whl-box-border whl-h-full whl-w-full">
      {component && component}
    </ScrollArea>
  );
};

export default HighlightsGroupBy;
