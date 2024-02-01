"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";

import { useTagOnHighlight } from "./useTag";

export const useHighlight = (
  id: string,
  defaultValue?: HighlightWithLabelAndPageAndTag,
) => {
  const {
    data: highlight,
    mutate,
    isLoading,
    error,
  } = useSWR<HighlightWithLabelAndPageAndTag>(`/api/highlights/${id}`, {
    refreshInterval: 0,
    fallbackData: defaultValue,
  });

  const { removeTag } = useTagOnHighlight(id);

  const handleRemoveTag = useCallback(
    async (tagId: string) => {
      if (!highlight) {
        return;
      }
      void mutate({
        ...highlight,
        HighlightOnTag: highlight.HighlightOnTag.filter(
          ({ tag }) => tag.id !== tagId,
        ),
      });
      await removeTag(tagId);
    },
    [removeTag, mutate, highlight?.id],
  );

  return useMemo(
    () => ({
      highlight,
      handleRemoveTag,
      isLoading,
      error,
    }),
    [highlight, handleRemoveTag, isLoading, error],
  );
};
