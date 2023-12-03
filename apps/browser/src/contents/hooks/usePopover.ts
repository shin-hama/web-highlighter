import { useMemo, useState } from "react";
import { useEvent } from "react-use";

export const usePopover = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

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

    // TODO: 選択した要素が input などの場合は表示しない
    // FIXME: 選択した要素がからでも表示されてしまうことがある
    if (selectedText && selectedText.length > 0) {
      setOpen(true);
      setPos({ x: event.pageX, y: event.pageY });
    } else {
      setOpen(false);
    }
  };
  useEvent("mouseup", onMouseUp);

  return useMemo(() => ({ open, pos }), [open, pos]);
};
