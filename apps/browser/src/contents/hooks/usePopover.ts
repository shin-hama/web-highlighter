import { useCallback, useEffect, useMemo, useState } from "react";
import { useEvent, useWindowScroll } from "react-use";

import { useMarkerWatcher } from "~/contents/hooks/useMarkerWatcher";
import type { MaybeHighlight } from "~/contents/types";
import { useHighlightsContext } from "../components/contexts/HighlightsProvider";
import { usePositionParser } from "./usePositionParser";
import { useTextFragments } from "./useTextFragments";

export const usePopover = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const highlights = useHighlightsContext();
  const [highlight, setHighlight] = useState<MaybeHighlight | null>(null);
  const { parse } = usePositionParser();
  const { build } = useTextFragments();

  // すでに表示されている Highlight をクリックしたときに ContextMenu を開く
  useMarkerWatcher({
    onClicked: (e, id) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);
      setPos({ x: e.pageX, y: e.pageY });
      setHighlight(highlights.find((h) => id.startsWith(h.id)) ?? null);
    },
  });

  const scroll = useWindowScroll();

  const close = useCallback(() => {
    setHighlight(null);
  }, []);

  useEffect(() => {
    close();
  }, [scroll, close]);

  const onMouseUp = (event: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection === null) {
      return;
    }
    const selectedText = selection.toString().trim();

    // Check if the selection is inside an input or textarea
    const isInsideInputOrTextarea = Array.from(
      selection?.anchorNode?.childNodes ?? [],
    ).some((node) => ["INPUT", "TEXTAREA"].includes(node.nodeName));

    if (isInsideInputOrTextarea) {
      close();
      return;
    }

    if (selectedText && selectedText.length > 0) {
      setHighlight({
        content: selectedText,
        position: parse(selection),
        url: build(selection) ?? "",
        id: undefined,
        labelId: undefined,
      });
      setPos({ x: event.pageX, y: event.pageY });
    } else {
      close();
    }
  };
  useEvent("mouseup", onMouseUp);

  return useMemo(
    () => ({ open: highlight !== null, pos, highlight, close }),
    [highlight, pos, close],
  );
};
