import { getServerAuthSession } from "@whl/auth";
import { ScrollArea } from "@whl/ui/components/ui/scroll-area";

import { getPages } from "~/lib/get-pages";
import PageCard from "./PageCard";

interface Props {
  labels?: string[];
}
const PageList = async ({ labels }: Props) => {
  const session = await getServerAuthSession();

  if (session === null) {
    return <div>Not logged in</div>;
  }
  const pages = await getPages({ userId: session.user.id, filter: { labels } });

  return (
    <ScrollArea className="whl-box-border whl-h-full whl-w-full">
      {pages.map((page, index) => (
        <PageCard key={index} {...page.page} />
      ))}
    </ScrollArea>
  );
};

export default PageList;
