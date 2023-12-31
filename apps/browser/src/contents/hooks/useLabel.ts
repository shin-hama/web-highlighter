import { useMemo, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

import type { CreateHighlightRequest } from "@whl/common-types";
import type { Label } from "@whl/db";

import { useMarker } from "./useMarker";
import { usePositionParser } from "./usePositionParser";
import { useTextFragments } from "./useTextFragments";

interface Actions {
  init: () => void;
  setLabel: (label: Label) => void;
  save: (tags: { name: string }[]) => void;
  removeHighlight: () => void;
}

export const useHighlight = (): readonly [
  CreateHighlightRequest["highlight"] | null,
  Actions,
] => {
  const [highlight, setSelected] = useState<
    CreateHighlightRequest["highlight"] | null
  >(null);
  const [highlightElm, setHighlightElm] = useState<HTMLElement | null>(null);
  const { parse } = usePositionParser();
  const { mark } = useMarker();
  const { build } = useTextFragments();

  const actions = useMemo<Actions>(() => {
    const init = () => {
      setSelected(null);
      setHighlightElm(null);
    };

    const setLabel = (label: Label) => {
      const selection = window.getSelection();
      if (!selection) {
        return;
      }

      const content = selection?.toString().trim();
      if (content.length === 0) {
        return;
      }

      setSelected({
        content,
        labelId: label.id,
        position: parse(selection),
        url: build(selection) ?? "",
      });

      // 現在選択されているテキストをハイライトする
      mark(parse(selection), label.color);
    };

    const removeHighlight = () => {
      if (!highlightElm) {
        return;
      }

      highlightElm.remove();
      setHighlightElm(null);
    };

    const save = (tags: { name: string }[]) => {
      // Label と Tag を作成する
      if (!highlight) {
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
            labelId: highlight.labelId,
            position: highlight.position,
            url: highlight.url,
          },
          tags: tags,
        },
      })
        .then((result) => {
          if (!result) {
            removeHighlight();
          }
        })
        .catch((error) => {
          console.error(error);
          // ハイライトを削除する
          removeHighlight();
        });
    };

    return {
      init,
      save,
      setLabel,
      removeHighlight,
    };
  }, [build, highlight, highlightElm, mark, parse]);

  return useMemo(() => [highlight, actions] as const, [highlight, actions]);
};
