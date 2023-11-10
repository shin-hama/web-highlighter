"use client";

import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { HashIcon, XIcon } from "lucide-react";

import { useTagFilter } from "../../_context/TagFilterContext";

const FilteredTags = () => {
  const [selectedTags, setSelectedTags] = useTagFilter();

  if (selectedTags.length === 0) {
    return <></>;
  }

  return (
    <div className="whl-flex whl-flex-row whl-gap-2">
      <div className="whl-flex whl-flex-row whl-items-center whl-gap-1 whl-text-sm whl-font-bold">
        <HashIcon size={16} />
        tags:
      </div>
      {selectedTags.map((tag) => (
        <Badge key={tag.id} className="whl-items-center whl-gap-1 whl-text-xs">
          <HashIcon size={12} /> {tag.name}
          <Button
            variant="ghost"
            size="icon_xs"
            onClick={() => setSelectedTags.removeAt(selectedTags.indexOf(tag))}
          >
            <XIcon size={12} />
          </Button>
        </Badge>
      ))}
    </div>
  );
};

export default FilteredTags;
