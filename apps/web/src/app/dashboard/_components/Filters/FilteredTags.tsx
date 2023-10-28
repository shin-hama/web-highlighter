"use client";

import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { XIcon } from "lucide-react";

import { useTagFilter } from "../../_context/TagFilterContext";

const FilteredTags = () => {
  const [selectedTags, setSelectedTags] = useTagFilter();

  return (
    <div className="whl-flex whl-flex-row whl-gap-2">
      {selectedTags.map((tag) => (
        <Badge key={tag.id} className="whl-items-center whl-gap-1 whl-text-xs">
          {tag.name}
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
