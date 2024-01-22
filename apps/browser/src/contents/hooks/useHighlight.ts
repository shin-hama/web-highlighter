import { useMemo, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

import type { CreateHighlightRequest, TagDTO } from "@whl/common-types";
import type { Label } from "@whl/db";

import type { MaybeHighlight } from "../types";
import { useMarker } from "./useMarker";

interface HighlightHookModel {
  labelId: string | null;
  tags: TagDTO[];
}
interface Actions {
  setLabel: (label: Label) => void;
  addTag: (tag: TagDTO) => void;
  removeTag: (tag: TagDTO) => void;
  save: () => void;
  remove: () => void;
}

export const useHighlight = (
  highlight: MaybeHighlight,
): readonly [HighlightHookModel, Actions] => {
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

    const save = () => {
      // Label と Tag を作成する
      if (!labelId || !highlight.position) {
        return;
      }

      sendToBackground<CreateHighlightRequest>({
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
      })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const remove = () => {
      if (!highlight.id) {
        if (marker.length > 0) {
          // 未保存だがハイライトされている場合はここで削除する
          marker.forEach((element) => {
            element.remove();
          });
        }
        return;
      }

      sendToBackground({
        name: "highlight/remove",
        body: {
          id: highlight.id,
        },
      })
        .then((result) => {
          console.log(result);
          marker.forEach((element) => {
            element.remove();
          });
        })
        .catch((error) => {
          console.error(error);
        });
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
