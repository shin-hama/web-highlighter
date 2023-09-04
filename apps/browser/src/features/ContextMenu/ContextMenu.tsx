import { useState } from "react";
import { Card, CardContent, CardFooter } from "@ui/components/ui/Card";
import { Textarea } from "@ui/components/ui/Textarea";
import { useEvent } from "react-use";

import Colors from "./Colors";

const ContextMenu = () => {
  const [text, setText] = useState("");
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
      } whl-fixed whl-z-50 whl-flex whl-left-[${pos.x}] whl-top-[${pos.y}]`}
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
