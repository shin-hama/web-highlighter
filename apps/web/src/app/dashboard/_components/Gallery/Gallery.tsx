"use client";

import { useCallback, useMemo, useRef } from "react";
import Masonry from "@mui/lab/Masonry";
import useSWRInfinite from "swr/infinite";

import type {
  GetHighlightsResponse,
  HighlightWithLabelAndPageAndTag,
} from "@whl/common-types";

import { useLabelsFilter } from "~/app/dashboard/_hooks/useLabelsFilter";
import { useIntersectionHandler } from "~/hook/useIntersectionHandler";
import { useTagFilter } from "../../_context/TagFilterContext";
import { HighlightCard } from "../Highlight";

const PAGE_SIZE = 20;
const HighlightGallery = () => {
  const labels = useLabelsFilter();
  const [tags] = useTagFilter();

  const getKey = useCallback(
    (pageIndex: number, previousPageData: GetHighlightsResponse | null) => {
      const params = new URLSearchParams();
      params.append("limit", PAGE_SIZE.toString());
      if (labels && labels.length > 0) {
        params.append("labels", labels.join(","));
      }
      if (tags.length > 0) {
        params.append("tags", tags.map((tag) => tag.id).join(","));
      }

      if (previousPageData?.nextCursor) {
        params.append("cursor", previousPageData.nextCursor);
      } else if (pageIndex !== 0) {
        return null;
      }
      return `/api/highlights?${params.toString()}`;
    },
    [labels, tags],
  );
  const { data, size, setSize, isLoading, isValidating } =
    useSWRInfinite<GetHighlightsResponse>(getKey);

  const highlights = useMemo<HighlightWithLabelAndPageAndTag[]>(
    () => (data ?? []).flatMap((res) => res.highlights),
    [data],
  );

  const hasMore = useMemo<boolean>(
    () => !!data && data?.[data.length - 1]?.nextCursor !== null,
    [data],
  );
  const showLoadMore = useMemo<boolean>(
    () => hasMore && !isLoading && !isValidating,
    [hasMore, isLoading, isValidating],
  );

  const ref = useRef<HTMLDivElement>(null);
  const loadMore = useCallback(() => {
    if (hasMore) {
      void setSize(size + 1);
    }
  }, [hasMore, size, setSize]);

  useIntersectionHandler(ref, loadMore);

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
        {(highlights ?? []).map((highlight) => (
          <HighlightCard key={highlight.id} {...highlight} />
        ))}
      </Masonry>
      {showLoadMore && <div ref={ref} className=""></div>}
    </div>
  );
};

export default HighlightGallery;
