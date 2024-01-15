"use client";

import { useCallback, useMemo } from "react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import type { HighlightWithLabelAndPositionAndTag } from "@whl/common-types";

const updateHighlight = (url: string, { arg: tag }: { arg: string }) =>
  fetch(`${url}/tags`, {
    method: "POST",
    body: JSON.stringify({
      tag: {
        name: tag,
      },
    }),
  }).then((res) => res.json() as Promise<HighlightWithLabelAndPositionAndTag>);

const removeHighlight = (url: string, { arg: tagId }: { arg: string }) =>
  fetch(`${url}/tags/${tagId}`, {
    method: "DELETE",
  }).then((res) => res.json() as Promise<HighlightWithLabelAndPositionAndTag>);

/**
 * ハイライトに紐付けられたタグを追加・削除するカスタムフック
 * 追加･削除を実行するとタグ一覧のキャッシュを更新する
 * @param highlightId
 * @returns
 */
export const useTagOnHighlight = (highlightId: string) => {
  const { mutate, cache } = useSWRConfig();

  const { trigger: triggerAdd } = useSWRMutation(
    `/api/highlights/${highlightId}`,
    updateHighlight,
  );
  const { trigger: triggerRemove } = useSWRMutation(
    `/api/highlights/${highlightId}`,
    removeHighlight,
  );

  const addTag = useCallback(
    async (newTag: string) => {
      await triggerAdd(newTag);
      for (const key of cache.keys()) {
        if (key.includes("api/tags")) {
          console.log(key);
          void mutate(key); // With this you can revalidate whatever the key is. (with @, $inf$ or whatever)
        }
      }
    },
    [mutate, triggerAdd],
  );

  const removeTag = useCallback(
    async (tagId: string) => {
      await triggerRemove(tagId);
      for (const key of cache.keys()) {
        if (key.includes("api/tags")) {
          console.log(key);
          void mutate(key); // With this you can revalidate whatever the key is. (with @, $inf$ or whatever)
        }
      }
    },
    [mutate, triggerRemove],
  );

  return useMemo(
    () => ({
      addTag,
      removeTag,
    }),
    [addTag, removeTag],
  );
};
