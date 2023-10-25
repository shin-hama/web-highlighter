import { useMemo, useState } from "react";
import { useEvent } from "react-use";

export const usePopup = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });

  const onMouseUp = (event: React.MouseEvent) => {
    const selectedText = window.getSelection()?.toString().trim();

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
