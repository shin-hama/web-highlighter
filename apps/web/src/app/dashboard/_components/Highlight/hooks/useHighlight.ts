"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import type {
  HighlightWithLabelAndPageAndTag,
  UpdateHighlightRequest,
} from "@whl/common-types";

import { useTagOnHighlight } from "./useTag";

const updateHighlight = (
  url: string,
  { arg: highlightDTO }: { arg: UpdateHighlightRequest },
) =>
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(highlightDTO),
  }).then((res) => res.json() as Promise<HighlightWithLabelAndPageAndTag>);

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
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
  });

  const { trigger: triggerUpdate } = useSWRMutation(
    `/api/highlights/${id}`,
    updateHighlight,
  );

  const { removeTag: removeTagHook } = useTagOnHighlight(id);

  const update = useCallback(
    async (highlightDTO: UpdateHighlightRequest) => {
      if (!highlight) {
        return;
      }
      await triggerUpdate(highlightDTO, {
        optimisticData: {
          ...highlight,
          ...highlightDTO.highlight,
        },
      });
    },
    [highlight, triggerUpdate],
  );

  const removeTag = useCallback(
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
      await removeTagHook(tagId);
    },
    [removeTagHook, mutate, highlight],
  );

  return useMemo(
    () => ({
      highlight,
      update: update,
      removeTag: removeTag,
      isLoading,
      error,
    }),
    [highlight, update, removeTag, isLoading, error],
  );
};
