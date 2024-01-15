"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { Skeleton } from "@ui/components/ui/skeleton";
import { SearchIcon } from "lucide-react";
import useSWRInfinite from "swr/infinite";

import type { GetTagsResponse } from "@whl/common-types";
import type { Tag } from "@whl/db";
import { Input } from "@whl/ui/components/ui/input";
import { Toggle } from "@whl/ui/components/ui/toggle";

import { useTagFilter } from "../../_context/TagFilterContext";

const PAGE_SIZE = 20;

const TagExplore = () => {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useTagFilter();

  const getKey = useCallback(
    (pageIndex: number, previousPageData: GetTagsResponse | null) => {
      const params = new URLSearchParams();
      params.append("hasHighlights", "true");
      params.append("limit", PAGE_SIZE.toString());
      if (previousPageData?.nextCursor) {
        params.append("cursor", previousPageData.nextCursor);
      } else if (pageIndex !== 0) {
        return null;
      }
      return `/api/tags?${params.toString()}`;
    },
    [],
  );
  const { data, size, setSize, isLoading } = useSWRInfinite<GetTagsResponse>(
    getKey,
    {
      revalidateFirstPage: false,
    },
  );

  const handleChanged = (tag: Tag) => (selected: boolean) => {
    if (selected) {
      setSelectedTags.push(tag);
    } else {
      setSelectedTags.removeAt(selectedTags.indexOf(tag));
    }
  };

  const isEmpty = data?.[0]?.tags.length === 0;
  const isReachingEnd =
    isEmpty || (data?.[data.length - 1]?.tags.length ?? 0) < PAGE_SIZE;

  const tags = useMemo(
    () =>
      data
        ?.map((res) => res.tags)
        .flat()
        .filter((tag) => tag.name.includes(query)),
    [data, query],
  );

  return (
    <div className="whl-flex whl-flex-grow whl-flex-col whl-gap-4 whl-overflow-hidden">
      <div className="whl-w-fit">
        <Input
          icon={<SearchIcon size={16} />}
          placeholder="Search tags..."
          className="whl-border-muted-foreground whl-bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ScrollArea>
        <div className="whl-flex whl-flex-col whl-gap-1">
          {isLoading || tags === undefined
            ? Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={`tag-skelton-${i}`} className="whl-h-6" />
              ))
            : tags.map((tag) => (
                <Toggle
                  key={tag.id}
                  size="xs"
                  className="whl-justify-between"
                  pressed={selectedTags.some((value) => value.id === tag.id)}
                  onPressedChange={handleChanged(tag)}
                >
                  # {tag.name}
                  <Badge className="whl-rounded-sm">
                    {tag._count.HighlightOnTag}
                  </Badge>
                </Toggle>
              ))}
          {!isReachingEnd && (
            <Button onClick={() => void setSize(size + 1)}>Load more</Button>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TagExplore;
