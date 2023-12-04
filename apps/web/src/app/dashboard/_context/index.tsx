import { DashboardSettingsProvider } from "../_hooks/useDashboardSettings";
import { TagFilterProvider } from "./TagFilterContext";

export const DashboardProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <TagFilterProvider>
      <DashboardSettingsProvider>{children}</DashboardSettingsProvider>
    </TagFilterProvider>
  );
};
