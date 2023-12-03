"use client";

import { useEffect, useMemo } from "react";
import { createStateContext, useLocalStorage } from "react-use";

import { GROUPING_TYPE } from "~/types";
import type { GroupingType } from "~/types";

interface DashboardSettings {
  grouping?: GroupingType;
}

const [useDashboardSettingsContext, DashboardSettingsProvider] =
  createStateContext<DashboardSettings>({
    grouping: undefined,
  });

interface DashboardSettingsActions {
  setGrouping: (grouping: GroupingType) => void;
}
export const useDashboardSettings = (): readonly [
  DashboardSettings,
  DashboardSettingsActions,
] => {
  const [settings, setSettings] = useDashboardSettingsContext();
  const [grouping, setGrouping] = useLocalStorage<GroupingType>(
    "grouping",
    GROUPING_TYPE.page,
  );

  useEffect(() => {
    setSettings({ ...settings, grouping });
  }, [grouping]);

  const actions = useMemo<DashboardSettingsActions>(() => {
    return {
      setGrouping(value) {
        console.log(value);
        setSettings({ ...settings, grouping: value });
        setGrouping(value);
      },
    };
  }, [setGrouping]);

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  return [settings, actions] as const;
};

export { DashboardSettingsProvider };
