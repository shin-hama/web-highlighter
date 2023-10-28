"use client";

import { useTagFilter } from "../../_context/TagFilterContext";

const FilteredTags = () => {
  const [selectedTags, setSelectedTags] = useTagFilter();

  return (
    <div className="whl-flex whl-flex-row whl-gap-2">
      {selectedTags.map((tag) => (
        <div
          key={tag.id}
          className="whl-flex whl-flex-row whl-items-center whl-gap-2 whl-rounded-md whl-bg-primary whl-px-2 whl-py-1"
        >
          <div className="whl-text-muted-foreground">
            <p>{tag.name}</p>
          </div>
          <div className="whl-text-muted-foreground">
            <button
              onClick={() =>
                setSelectedTags.removeAt(selectedTags.indexOf(tag))
              }
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilteredTags;
