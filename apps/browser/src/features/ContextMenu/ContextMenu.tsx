import type { FC } from "react";
import { useState } from "react";
import { useEvent } from "react-use";

import { Card, CardContent, CardFooter } from "@whl/ui/components/ui/Card";
import { Textarea } from "@whl/ui/components/ui/Textarea";

import Colors from "./Colors";

const ContextMenu: FC = () => {
  const [text, setText] = useState("");
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
          <Textarea value={text} onChange={(e) => setText(e.target.value)} />
        </CardContent>
        <CardFooter>
          <Colors />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContextMenu;
