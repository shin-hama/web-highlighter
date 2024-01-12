"use client";

import { useCallback, useState } from "react";
import { PlusIcon } from "lucide-react";
import useSWR from "swr";

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

interface Props {
  /**
   * Tags already added on Highlight
   */
  addedTags: Tag[];
  highlightId: string;
}
const AddTagsForm = ({ addedTags, highlightId }: Props) => {
  const [value, setValue] = useState("");
  const { data: tags, isLoading } = useSWR<GetTagsResponse>("/api/tags");
  const { addTag, removeTag } = useTagOnHighlight(highlightId);

  const handleSelectTag = useCallback((tag: Tag) => {
    if (addedTags.some((addedTag) => addedTag.id === tag.id)) {
      handleRemoveTag(tag.id);
    } else {
      handleAddTag(tag.name);
    }
  }, []);

  const handleAddTag = useCallback((newTag: string) => {
    void addTag(newTag);
    setValue("");
  }, []);

  const handleRemoveTag = useCallback((tagId: string) => {
    void removeTag(tagId);
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
