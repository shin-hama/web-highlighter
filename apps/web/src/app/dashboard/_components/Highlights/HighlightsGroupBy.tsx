"use client";

import { useEffect, useState } from "react";

import { GROUPING_TYPE } from "~/types";
import { useDashboardSettings } from "../../_hooks/useDashboardSettings";
import PageList from "./PageGroup/PageList";
import TagGroup from "./TagGroup/TagGroup";

const HighlightsGroupBy = () => {
  const [settings] = useDashboardSettings();
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    // Hydration Error が発生するため useEffect でコンポーネントをセットする
    if (settings.grouping === GROUPING_TYPE.tag) {
      setComponent(<TagGroup />);
    } else {
      setComponent(<PageList />);
    }
  }, [settings]);

  return <>{component && component}</>;
};

export default HighlightsGroupBy;
