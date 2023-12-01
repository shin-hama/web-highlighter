"use client";

import useSWR from "swr";

import type { GetHighlightsGroupByPageResponse } from "@whl/common-types";
import { ScrollArea } from "@whl/ui/components/ui/scroll-area";

import PageCard from "./PageCard";

interface Props {
  labels?: string[];
}
const PageList = ({ labels }: Props) => {
  const {
    data: pages,
    error,
    isLoading,
  } = useSWR<GetHighlightsGroupByPageResponse>(
    "/api/pages/highlights",
    (url: string) => fetch(url).then((res) => res.json()),
  );

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <>Server error</>;
  }

  return (
    <ScrollArea className="whl-box-border whl-h-full whl-w-full">
      {pages?.map((page, index) => <PageCard key={index} {...page.page} />)}
    </ScrollArea>
  );
};

export default PageList;
