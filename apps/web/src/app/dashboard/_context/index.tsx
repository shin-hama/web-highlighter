import { DashboardSettingsProvider } from "../_hooks/useDashboardSettings";
import { DetailProvider } from "./PageDetailContext";
import { TagFilterProvider } from "./TagFilterContext";

export const DashboardProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <TagFilterProvider>
      <DetailProvider>
        <DashboardSettingsProvider>{children}</DashboardSettingsProvider>
      </DetailProvider>
    </TagFilterProvider>
  );
};
