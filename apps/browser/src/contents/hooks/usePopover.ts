import { useEffect, useMemo, useState } from "react";
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
      setHighlight(highlights.find((h) => h.id === id) ?? null);
    },
  });

  const scroll = useWindowScroll();

  useEffect(() => {
    setHighlight(null);
  }, [scroll]);

  useEffect(() => {
    const onSelectionChange = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (selectedText?.length === 0) {
        setHighlight(null);
      }
    };
    // useEvent で selectionchange イベントを listen できないので直接登録する
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

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
      setHighlight(null);
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
    }
  };
  useEvent("mouseup", onMouseUp);

  return useMemo(
    () => ({ open: highlight !== null, pos, highlight }),
    [highlight, pos],
  );
};
