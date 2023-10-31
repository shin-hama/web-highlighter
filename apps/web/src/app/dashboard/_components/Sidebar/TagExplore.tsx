"use client";

import React, { useState } from "react";
import { Badge } from "@ui/components/ui/badge";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { SearchIcon } from "lucide-react";

import type { TagWithCountOfHighlights } from "@whl/common-types";
import type { Tag } from "@whl/db";
import { Input } from "@whl/ui/components/ui/input";
import { Toggle } from "@whl/ui/components/ui/toggle";

import { useTagFilter } from "../../_context/TagFilterContext";

interface Props {
  tags: TagWithCountOfHighlights[];
}

const TagExplore = ({ tags }: Props) => {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useTagFilter();

  const handleChanged = (tag: Tag) => (selected: boolean) => {
    if (selected) {
      setSelectedTags.push(tag);
    } else {
      setSelectedTags.removeAt(selectedTags.indexOf(tag));
    }
  };

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
          {tags
            .filter((tag) => tag.name.includes(query))
            .map((tag) => (
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
        </div>
      </ScrollArea>
    </div>
  );
};

export default TagExplore;
