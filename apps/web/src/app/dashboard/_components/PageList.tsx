import { getServerAuthSession } from "@whl/auth";
import { ScrollArea } from "@whl/ui/components/ui/scroll-area";

import { getPages } from "~/lib/get-pages";
import PageCard from "./PageCard";

const PageList = async () => {
  const session = await getServerAuthSession();

  if (session === null) {
    return <div>Not logged in</div>;
  }
  const pages = await getPages(session.user.id);

  return (
    <ScrollArea className="whl-h-full">
      {pages.map((page, index) => (
        <PageCard key={index} {...page.page} />
      ))}
    </ScrollArea>
  );
};

export default PageList;
