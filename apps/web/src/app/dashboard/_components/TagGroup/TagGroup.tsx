import { getServerAuthSession } from "@whl/auth";

import { getTags } from "~/lib/get-tags";
import TagCard from "./TagCard";

const TagGroup = async () => {
  const session = await getServerAuthSession();
  if (session === null) {
    return <div>Not logged in</div>;
  }
  const tags = await getTags(session.user.id);

  return (
    <div className="whl-group/tag whl-w-full whl-overflow-hidden">
      {tags.map((tag) => (
        <TagCard
          key={tag.id}
          name={tag.name}
          count={tag._count.HighlightOnTag}
        />
      ))}
    </div>
  );
};

export default TagGroup;
