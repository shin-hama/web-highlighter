"use client";

import { useCallback, useMemo, useRef } from "react";
import type { SWRInfiniteKeyLoader } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

import type { HasCursorResponse } from "@whl/common-types/api/common";

import { useIntersectionHandler } from "~/hook/useIntersectionHandler";

export const useInfiniteLoader = <T extends HasCursorResponse>(
  getKey: SWRInfiniteKeyLoader,
) => {
  const { data, size, setSize, isLoading, isValidating } =
    useSWRInfinite<T>(getKey);

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

  return useMemo(() => {
    return {
      triggerRef: ref,
      data,
      hasMore,
      showLoadMore,
      loadMore,
    };
  }, [data, loadMore, hasMore, ref, showLoadMore]);
};
