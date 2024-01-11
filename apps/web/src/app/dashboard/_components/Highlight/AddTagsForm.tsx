"use client";

import { useCallback, useState } from "react";
import { PlusIcon } from "lucide-react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import type {
  GetTagsResponse,
  HighlightWithLabelAndPositionAndTag,
} from "@whl/common-types";
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const updateHighlight = (url: string, { arg: tag }: { arg: string }) =>
  fetch(`${url}/tags`, {
    method: "POST",
    body: JSON.stringify({
      tag: {
        name: tag,
      },
    }),
  }).then((res) => res.json() as Promise<HighlightWithLabelAndPositionAndTag>);

const removeHighlight = (url: string, { arg: tagId }: { arg: string }) =>
  fetch(`${url}/tags/${tagId}`, {
    method: "DELETE",
  }).then((res) => res.json() as Promise<HighlightWithLabelAndPositionAndTag>);

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
  const { trigger: triggerRemove } = useSWRMutation(
    `/api/highlights/${highlightId}`,
    removeHighlight,
  );

  const handleSelectTag = useCallback((tag: Tag) => {
    if (addedTags.some((addedTag) => addedTag.id === tag.id)) {
      void handleRemoveTag(tag.id);
    } else {
      void handleAddTag(tag.name);
    }
  }, []);

  const handleAddTag = useCallback(async (newTag: string) => {
    await trigger(newTag);
    void mutate();
    setValue("");
  }, []);

  const handleRemoveTag = useCallback(async (tagId: string) => {
    await triggerRemove(tagId);
    void mutate();
    setValue("");
  }, []);

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
                onSelect={() => handleSelectTag(tag)}
                className="whl-gap-2"
              >
                <Checkbox
                  checked={addedTags.some((addedTag) => addedTag.id === tag.id)}
                />
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
