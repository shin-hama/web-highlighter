import { useMemo, useState } from "react";

import type { Label } from "@whl/db";

interface HighlightedContent {
  content: string;
  label: Label;
}

interface Actions {
  setLabel: (label: Label) => void;
  removeHighlight: () => void;
}

export const useHighlight = (): readonly [
  HighlightedContent | null,
  Actions,
] => {
  const [highlight, setSelected] = useState<HighlightedContent | null>(null);
  const [highlightElm, setHighlightElm] = useState<HTMLElement | null>(null);

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

      setSelected({ content, label });

      // 現在選択されているテキストをハイライトする
      const range = selection.getRangeAt(0);
      const elm = document.createElement("span");
      elm.style.backgroundColor = label.color;
      elm.style.borderRadius = "2px";
      elm.style.padding = "2px 2px";
      elm.style.margin = "0 1px";
      range.surroundContents(elm);
      setHighlightElm(elm);
    };

    const removeHighlight = () => {
      if (!highlightElm) {
        return;
      }

      highlightElm.remove();
      setHighlightElm(null);
    };

    return {
      setLabel,
      removeHighlight,
    };
  }, [highlightElm]);

  return useMemo(() => [highlight, actions] as const, [highlight, actions]);
};
