"use client";

import useSWR from "swr";

import type { GetTagsResponse } from "@whl/common-types";

import TagCard from "./TagCard";

const TagGroup = () => {
  const { data: tags } = useSWR<GetTagsResponse>("/api/tags", (url: string) =>
    fetch(url).then((res) => res.json()),
  );

  return (
    <div className="whl-w-full whl-overflow-hidden">
      {tags?.map((tag) => <TagCard key={tag.id} tag={tag} />)}
    </div>
  );
};

export default TagGroup;
