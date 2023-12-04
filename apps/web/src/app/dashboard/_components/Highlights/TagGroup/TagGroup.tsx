"use client";

import useSWR from "swr";

import type { GetTagsResponse } from "@whl/common-types";

import TagCard from "./TagCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TagGroup = () => {
  const { data: tags } = useSWR<GetTagsResponse>("/api/tags", fetcher);

  return <>{tags?.map((tag) => <TagCard key={tag.id} tag={tag} />)}</>;
};

export default TagGroup;
