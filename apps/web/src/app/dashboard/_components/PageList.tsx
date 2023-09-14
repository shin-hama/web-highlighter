import { getServerAuthSession } from "@whl/auth";

import { getPages } from "~/lib/get-pages";
import PageCard from "./PageCard";

const PageList = async () => {
  const session = await getServerAuthSession();

  if (session === null) {
    return <div>Not logged in</div>;
  }
  const pages = await getPages(session.user.id);

  return pages.map((page, index) => <PageCard key={index} {...page} />);
};

export default PageList;
