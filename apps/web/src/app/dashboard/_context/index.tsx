import { DashboardSettingsProvider } from "../_hooks/useDashboardSettings";
import { HighlightDetailProvider } from "./HighlightDetailContext";
import { TagFilterProvider } from "./TagFilterContext";

export const DashboardProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <TagFilterProvider>
      <HighlightDetailProvider>
        <DashboardSettingsProvider>{children}</DashboardSettingsProvider>
      </HighlightDetailProvider>
    </TagFilterProvider>
  );
};
