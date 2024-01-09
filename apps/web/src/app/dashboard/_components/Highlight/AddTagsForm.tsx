"use client";

import { useState } from "react";

import "@ui/components/ui/button";

import { Skeleton } from "@ui/components/ui/skeleton";
import { CheckSquareIcon, PlusIcon, SquareIcon } from "lucide-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import type { GetTagsResponse } from "@whl/common-types";
import type { Tag } from "@whl/db";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@whl/ui/components/ui/command";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const updateHighlight = async (url: string, { arg }: { arg: string }) => {
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      tag: {
        name: arg,
      },
    }),
  });
};

interface Props {
  /**
   * Tags already added on Highlight
   */
  addedTags: Tag[];
  highlightId: string;
}
const AddTagsForm = ({ addedTags, highlightId }: Props) => {
  const [value, setValue] = useState("");
  const {
    data: tags,
    isLoading,
    mutate,
  } = useSWR<GetTagsResponse>("/api/tags", fetcher);

  const { trigger } = useSWRMutation(
    `/api/highlights/${highlightId}`,
    updateHighlight,
  );

  const handleAddTag = (newTag: string) => {
    void trigger(newTag);
    void mutate();
  };

  return (
    <div>
      <Command>
        <CommandInput
          placeholder="Enter tag..."
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          <CommandGroup>
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
                onSelect={handleAddTag}
                className="whl-gap-2"
              >
                {addedTags.some((addedTag) => addedTag.id === tag.id) ? (
                  <CheckSquareIcon />
                ) : (
                  <SquareIcon />
                )}
                {tag.name}
              </CommandItem>
            ))}
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
