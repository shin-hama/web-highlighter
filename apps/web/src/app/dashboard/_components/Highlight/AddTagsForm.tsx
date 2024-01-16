"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PlusIcon } from "lucide-react";
import useSWRInfinite from "swr/infinite";

import type { GetTagsResponse } from "@whl/common-types";
import type { Tag } from "@whl/db";
import { Checkbox } from "@whl/ui/components/ui/checkbox";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@whl/ui/components/ui/command";
import { Skeleton } from "@whl/ui/components/ui/skeleton";

import { useTagOnHighlight } from "./hooks/useTag";

const PAGE_SIZE = 5;
interface Props {
  /**
   * Tags already added on Highlight
   */
  addedTags: Tag[];
  highlightId: string;
}
const AddTagsForm = ({ addedTags, highlightId }: Props) => {
  const [value, setValue] = useState("");
  const { addTag, removeTag } = useTagOnHighlight(highlightId);

  const getKeyInf = useCallback(
    (pageIndex: number, previousPageData: GetTagsResponse | null) => {
      const params = new URLSearchParams();
      params.append("limit", PAGE_SIZE.toString());
      params.append("orderBy", "updatedAt");
      if (value) {
        params.append("name", value);
      }
      if (previousPageData?.nextCursor) {
        params.append("cursor", previousPageData.nextCursor);
      } else if (pageIndex !== 0) {
        return null;
      }
      return `/api/tags?${params.toString()}`;
    },
    [value],
  );
  const { data, setSize, isLoading } = useSWRInfinite<GetTagsResponse>(
    getKeyInf,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
    },
  );

  const hasMore = useMemo(
    () => !!data && data?.[data.length - 1]?.nextCursor !== null,
    [data],
  );

  const observeTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void setSize((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );
    if (observeTarget.current) {
      observer.observe(observeTarget.current);
    }
    return () => {
      if (observeTarget.current) {
        observer.unobserve(observeTarget.current);
      }
    };
  }, [setSize]);

  const handleAddTag = useCallback(
    (newTag: string) => {
      void addTag(newTag);
      setValue("");
    },
    [addTag],
  );

  const handleRemoveTag = useCallback(
    (tagId: string) => {
      void removeTag(tagId);
      setValue("");
    },
    [removeTag],
  );

  const handleSelectTag = useCallback(
    (tag: Tag) => {
      if (addedTags.some((addedTag) => addedTag.id === tag.id)) {
        handleRemoveTag(tag.id);
      } else {
        handleAddTag(tag.name);
      }
    },
    [addedTags, handleAddTag, handleRemoveTag],
  );

  const tags = useMemo(() => data?.map((res) => res.tags).flat(), [data]);

  return (
    <div>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Enter tag..."
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          <CommandGroup heading="Recently used">
            {isLoading && (
              <>
                <Skeleton className="whl-my-1 whl-h-8" />
                <Skeleton className="whl-my-1 whl-h-8" />
                <Skeleton className="whl-my-1 whl-h-8" />
              </>
            )}
            {tags?.map((tag) => (
              <CommandItem
                key={tag.id}
                onSelect={() => handleSelectTag(tag)}
                className="whl-gap-2"
              >
                <Checkbox
                  checked={addedTags.some((addedTag) => addedTag.id === tag.id)}
                />
                {tag.name}
              </CommandItem>
            ))}
            <div ref={observeTarget}>
              {hasMore && !isLoading && (
                <Skeleton className="whl-my-1 whl-h-8" />
              )}
            </div>
            {value && tags?.some((tag) => tag.name === value) === false && (
              <>
                <CommandSeparator />
                <CommandItem
                  key="whl-add-new-tag-button"
                  className="whl-gap-2"
                  onSelect={handleAddTag}
                  value={value}
                >
                  <>
                    <PlusIcon size={14} />
                    {`Create "${value}"`}
                  </>
                </CommandItem>
              </>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default AddTagsForm;
