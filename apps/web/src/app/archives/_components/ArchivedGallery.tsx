"use client";

import { useCallback, useMemo } from "react";
import Masonry from "@mui/lab/Masonry";

import type {
  GetHighlightsResponse,
  HighlightWithLabelAndPageAndTag,
} from "@whl/common-types";

import { useInfiniteLoader } from "~/hook/useInfiniteLoader";
import DeletedHighlight from "./DeletedHighlight";

const PAGE_SIZE = 20;

const ArchivedGallery = () => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: GetHighlightsResponse | null) => {
      const params = new URLSearchParams();
      params.append("limit", PAGE_SIZE.toString());

      if (previousPageData?.nextCursor) {
        params.append("cursor", previousPageData.nextCursor);
      } else if (pageIndex !== 0) {
        return null;
      }
      return `/api/highlights/deleted?${params.toString()}`;
    },
    [],
  );
  const { data, showLoadMore, triggerRef } =
    useInfiniteLoader<GetHighlightsResponse>(getKey);

  const highlights = useMemo<HighlightWithLabelAndPageAndTag[]>(
    () => (data ?? []).flatMap((res) => res.highlights),
    [data],
  );

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
          <DeletedHighlight key={highlight.id} {...highlight} />
        ))}
      </Masonry>
      {showLoadMore && <div ref={triggerRef} className=""></div>}
    </div>
  );
};

export default ArchivedGallery;
