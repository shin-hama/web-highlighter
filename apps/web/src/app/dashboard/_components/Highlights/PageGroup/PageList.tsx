"use client";

import { useCallback } from "react";
import useSWR from "swr";

import type { GetHighlightsGroupByPageResponse } from "@whl/common-types";

import PageCard from "./PageCard";

interface Props {
  labels?: string[];
}
const PageList = ({ labels }: Props) => {
  const getKey = useCallback(() => {
    const params = new URLSearchParams();
    if (labels) {
      params.append("labels", labels.join(","));
    }
    return `/api/pages/highlights?${params.toString()}`;
  }, [labels]);
  const {
    data: pages,
    error,
    isLoading,
  } = useSWR<GetHighlightsGroupByPageResponse>(getKey, (url: string) =>
    fetch(url).then((res) => res.json()),
  );

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <>Server error</>;
  }

  return <>{pages?.map((page) => <PageCard key={page.id} {...page.page} />)}</>;
};

export default PageList;
