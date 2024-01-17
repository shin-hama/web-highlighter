import { getServerAuthSession } from "@whl/auth";

import TagExplore from "./TagExplore";

const DashboardSidebar = async () => {
  const session = await getServerAuthSession();
  if (session === null) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="whl-h-full whl-w-60 whl-bg-primary-950 whl-px-4 whl-pb-4 whl-pt-4 whl-text-primary-foreground">
      <div className="whl-flex whl-h-full whl-flex-col whl-items-center whl-space-y-6 whl-overflow-y-hidden">
        <h1 className="whl-w-full whl-font-mono whl-text-2xl whl-font-bold">
          Dashboard
        </h1>
        <TagExplore />
      </div>
    </div>
  );
};

export default DashboardSidebar;
