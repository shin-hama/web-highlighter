import { TagFilterProvider } from "./TagFilterContext";

export const DashboardProvider = ({ children }: { children: JSX.Element }) => {
  return <TagFilterProvider>{children}</TagFilterProvider>;
};
