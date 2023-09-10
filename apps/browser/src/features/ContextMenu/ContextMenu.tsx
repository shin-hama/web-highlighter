import type { FC } from "react";
import { useCallback, useState } from "react";
import { useEvent } from "react-use";

import type { Color } from "@whl/common-types";
import { Card, CardContent } from "@whl/ui/components/ui/Card";

import Colors from "./Colors";

const ContextMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });

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

  const handleChanged = useCallback((color: Color) => {
    console.log({ color, content: window.getSelection()?.toString().trim() });
  }, []);

  return (
    <div
      className={`${open ? "" : "whl-hidden"} whl-absolute whl-z-50`}
      // tailwind を使うと動的に移動できなかったので、style で指定
      style={{
        left: pos.x,
        top: pos.y,
      }}
    >
      <Card>
        <CardContent>
          <Colors onChanged={handleChanged} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextMenu;
