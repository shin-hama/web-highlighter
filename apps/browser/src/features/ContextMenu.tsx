import { useState } from "react";
import { useEvent } from "react-use";

const ContextMenu = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseUp = (event: React.MouseEvent) => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText && selectedText.length > 0) {
      setOpen(true);
      setPos({ x: event.pageX, y: event.pageY });
    } else {
      setOpen(false);
    }
  };

  useEvent("mouseup", onMouseUp);

  return (
    <div
      className={`${
        open ? "" : "whl-hidden"
      } whl-bg-black whl-z-50 whl-flex whl-fixed whl-top-32 whl-right-8`}
    >
      <div className={`left-[${pos.x}] top-[${pos.y}]`}>test</div>
    </div>
  );
};

export default ContextMenu;
