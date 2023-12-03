"use client";

import useSWR from "swr";

import type { GetTagsResponse } from "@whl/common-types";

import TagCard from "./TagCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TagGroup = () => {
  const { data: tags } = useSWR<GetTagsResponse>("/api/tags", fetcher);

  return (
    <div className="whl-w-full whl-overflow-hidden">
      {tags?.map((tag, i) => <TagCard key={`tag-${i}`} tag={tag} />)}
    </div>
  );
};

export default TagGroup;
