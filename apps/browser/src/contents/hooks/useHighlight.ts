import { useMemo, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

import type {
  CreateHighlightRequest,
  SpecifiedHighlightRouteParam,
  TagDTO,
} from "@whl/common-types";
import type { Label } from "@whl/db";

import type { SaveHighlightResponse } from "~/background/messages/highlight/save";
import { useSetHighlightsContext } from "../components/contexts/HighlightsProvider";
import type { MaybeHighlight } from "../types";
import type { CommonMessageResponse } from "../types/background";
import { useMarker } from "./useMarker";

interface HighlightHookModel {
  labelId: string | null;
  tags: TagDTO[];
}
interface Actions {
  setLabel: (label: Label) => void;
  addTag: (tag: TagDTO) => void;
  removeTag: (tag: TagDTO) => void;
  save: () => Promise<void>;
  remove: () => Promise<void>;
}

export const useHighlight = (
  highlight: MaybeHighlight,
): readonly [HighlightHookModel, Actions] => {
  const setHighlights = useSetHighlightsContext();
  const [labelId, setCurrentLabel] = useState<string | null>(
    highlight.labelId ?? null,
  );
  const [tags, setTags] = useState<TagDTO[]>(() => {
    if (highlight && "HighlightOnTag" in highlight) {
      return highlight.HighlightOnTag.map((item) => item.tag);
    }
    return [];
  });

  const [marker, setMarker] = useState<Element[]>(() => {
    if (highlight.id) {
      return Array.from(document.getElementsByClassName(highlight.id));
    }
    return [];
  });

  const { mark } = useMarker();

  const actions = useMemo<Actions>(() => {
    const setLabel = (label: Label) => {
      const selection = window.getSelection();
      if (!selection) {
        return;
      }

      const content = selection?.toString().trim();
      if (content.length === 0) {
        return;
      }

      // 現在選択されているテキストをハイライトする
      setMarker(mark(highlight.position!, label.color));
      setCurrentLabel(label.id);
    };

    const addTag = (tag: TagDTO) => {
      setTags((prev) => [...prev, tag]);
    };

    const removeTag = (tag: TagDTO) => {
      setTags((prev) => prev.filter((item) => item.name !== tag.name));
    };

    const save = async () => {
      // Label と Tag を作成する
      if (!labelId || !highlight.position) {
        return;
      }

      const result = await sendToBackground<
        CreateHighlightRequest,
        SaveHighlightResponse
      >({
        name: "highlight/save",
        body: {
          page: {
            // build url removed query and fragment
            url: window.location.origin + window.location.pathname,
            title: document.title,
          },
          highlight: {
            content: highlight.content,
            labelId: labelId,
            position: highlight.position,
            url: highlight.url,
          },
          tags: tags,
        },
      });

      if (result.ok && result.data !== undefined) {
        // マーカーに id を付与する
        setCurrentLabel(result.data.labelId);
        marker.forEach((element, i) => {
          element.id = `${result.data!.id}-${i}`;
        });
        setHighlights((prev) => [...prev, result.data!]);
      }
    };

    const remove = async () => {
      if (!highlight.id) {
        if (marker.length > 0) {
          // 未保存だがハイライトされている場合はここで削除する
          marker.forEach((element) => {
            while (element.firstChild) {
              // insert 後に element.firstChild は削除される
              // https://developer.mozilla.org/ja/docs/Web/API/Node/insertBefore
              element.parentNode?.insertBefore(element.firstChild, element);
            }
            element.parentNode?.removeChild(element);
          });
        }
        return;
      }

      const result = await sendToBackground<
        SpecifiedHighlightRouteParam,
        CommonMessageResponse
      >({
        name: "highlight/remove",
        body: {
          id: highlight.id,
        },
      });

      if (result.ok) {
        setCurrentLabel(null);
        marker.forEach((element) => {
          while (element.firstChild) {
            // insert 後に element.firstChild は削除される
            // https://developer.mozilla.org/ja/docs/Web/API/Node/insertBefore
            element.parentNode?.insertBefore(element.firstChild, element);
          }
          element.parentNode?.removeChild(element);
        });
      }
    };

    return {
      save,
      remove,
      addTag,
      removeTag,
      setLabel,
    };
  }, [
    highlight.content,
    highlight.id,
    highlight.position,
    highlight.url,
    labelId,
    mark,
    marker,
    setHighlights,
    tags,
  ]);

  return useMemo(
    () =>
      [
        {
          labelId,
          tags,
        },
        actions,
      ] as const,
    [labelId, tags, actions],
  );
};
