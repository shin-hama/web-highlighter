"use client";

import Masonry from "@mui/lab/Masonry";
import useSWR from "swr";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";

import HighlightCard from "../Highlight/HighlightCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const HighlightGallery = () => {
  const { data } = useSWR<HighlightWithLabelAndPageAndTag[]>(
    "/api/highlights",
    fetcher,
  );
  return (
    <div className="whl-container whl-py-4">
      <Masonry columns={3} spacing={2}>
        {(data ?? []).map((highlight) => (
          <HighlightCard key={highlight.id} {...highlight} />
        ))}
      </Masonry>
    </div>
  );
};

export default HighlightGallery;
