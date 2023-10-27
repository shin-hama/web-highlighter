"use client";

import React, { useState } from "react";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { SearchIcon } from "lucide-react";

import type { Tag } from "@whl/db";
import { Input } from "@whl/ui/components/ui/input";
import { Toggle } from "@whl/ui/components/ui/toggle";

interface Props {
  tags: Tag[];
}

const TagExplore = ({ tags }: Props) => {
  const [query, setQuery] = useState("");

  return (
    <div className="whl-flex whl-flex-grow whl-flex-col whl-gap-4 whl-overflow-hidden">
      <div className="whl-w-fit">
        <Input
          icon={<SearchIcon size={16} />}
          placeholder="Search tags..."
          className="whl-border-muted-foreground whl-bg-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ScrollArea>
        <div className="whl-flex whl-flex-col whl-gap-1">
          {tags
            .filter((tag) => tag.name.includes(query))
            .map((tag) => (
              <Toggle key={tag.id} size="xs" className="whl-justify-start">
                # {tag.name}
              </Toggle>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TagExplore;
