import { getServerAuthSession } from "@whl/auth";

import { getTags } from "~/lib/get-tags";
import TagExplore from "./TagExplore";

const DashboardSidebar = async () => {
  const session = await getServerAuthSession();

  if (session === null) {
    return <div>Not logged in</div>;
  }
  const tags = await getTags(session.user.id);

  return (
    <div className="whl-h-full whl-w-48 whl-bg-primary whl-px-4 whl-pb-4 whl-pt-2 whl-text-primary-foreground">
      <div className="whl-h-full">
        <div className="whl-flex whl-h-full whl-flex-col whl-items-center whl-space-y-6 whl-overflow-hidden">
          <h1 className="whl-px-4 whl-font-mono whl-text-2xl whl-font-bold">
            Dashboard
          </h1>
          <TagExplore tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
