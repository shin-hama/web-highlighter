"use client";

import { HashIcon } from "lucide-react";

import { useTagFilter } from "../../_context/TagFilterContext";
import TagBadge from "../TagBadge";

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
        <TagBadge
          key={tag.id}
          tag={tag}
          removable
          onRemove={() => setSelectedTags.removeAt(selectedTags.indexOf(tag))}
        />
      ))}
    </div>
  );
};

export default FilteredTags;
