import { useEffect, useMemo, useState } from "react";
import { useEvent, useWindowScroll } from "react-use";

export const usePopover = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const scroll = useWindowScroll();

  useEffect(() => {
    setOpen(false);
  }, [scroll]);

  useEffect(() => {
    const onSelectionChange = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (selectedText?.length === 0) {
        setOpen(false);
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
    const selectedText = selection?.toString().trim();

    // Check if the selection is inside an input or textarea
    const isInsideInputOrTextarea = Array.from(
      selection?.anchorNode?.childNodes ?? [],
    ).some((node) => ["INPUT", "TEXTAREA"].includes(node.nodeName));

    if (isInsideInputOrTextarea) {
      setOpen(false);
      return;
    }

    if (selectedText && selectedText.length > 0) {
      setOpen(true);
      setPos({ x: event.pageX, y: event.pageY });
    }
  };
  useEvent("mouseup", onMouseUp);

  return useMemo(() => ({ open, pos }), [open, pos]);
};
