"use client";

import { useCallback } from "react";
import Masonry from "@mui/lab/Masonry";
import useSWR from "swr";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";

import { useLabelsFilter } from "~/app/dashboard/_hooks/useLabelsFilter";
import { useTagFilter } from "../../_context/TagFilterContext";
import HighlightCard from "../Highlight/HighlightCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HighlightGallery = () => {
  const labels = useLabelsFilter();
  const [tags] = useTagFilter();

  const getKey = useCallback(() => {
    const params = new URLSearchParams();
    if (labels && labels.length > 0) {
      params.append("labels", labels.join(","));
    }
    if (tags.length > 0) {
      params.append("tags", tags.map((tag) => tag.id).join(","));
    }
    return `/api/highlights?${params.toString()}`;
  }, [labels, tags]);

  const { data } = useSWR<HighlightWithLabelAndPageAndTag[]>(getKey, fetcher);
  return (
    <div className="whl-container whl-py-4">
      <Masonry
        columns={{
          sm: 2,
          md: 3,
          lg: 4,
        }}
        spacing={2}
      >
        {(data ?? []).map((highlight) => (
          <HighlightCard key={highlight.id} {...highlight} />
        ))}
      </Masonry>
    </div>
  );
};

export default HighlightGallery;
