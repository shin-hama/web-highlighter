"use client";

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
      <div className="whl-columns-2 md:whl-columns-3 lg:whl-columns-4">
        {data?.map((highlight) => (
          <div key={highlight.id} className="whl-pb-4">
            <HighlightCard {...highlight} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightGallery;
