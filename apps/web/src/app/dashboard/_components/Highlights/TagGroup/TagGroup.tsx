"use client";

import { useCallback } from "react";
import useSWR from "swr";

import type { GetTagsResponse } from "@whl/common-types";

import { useLabelsFilter } from "~/app/dashboard/_hooks/useLabelsFilter";
import TagCard from "./TagCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TagGroup = () => {
  const labels = useLabelsFilter();
  const getKey = useCallback(() => {
    const params = new URLSearchParams();
    if (labels && labels.length > 0) {
      params.append("labels", labels.join(","));
    }
    return `/api/tags?${params.toString()}`;
  }, [labels]);

  const { data: tags } = useSWR<GetTagsResponse>(getKey, fetcher);

  return <>{tags?.map((tag) => <TagCard key={tag.id} tag={tag} />)}</>;
};

export default TagGroup;
