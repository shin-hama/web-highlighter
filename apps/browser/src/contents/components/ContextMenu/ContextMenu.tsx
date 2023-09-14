import { useCallback, useEffect, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEvent } from "react-use";

import type { Session } from "@whl/auth";
import type { Color } from "@whl/common-types";
import { Card } from "@whl/ui/components/ui/Card";

import type { SaveHighlightRequest } from "~/background/messages/highlight/save";
import Colors from "./Colors";

const ContextMenu = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffect(() => {
    sendToBackground<undefined, Session>({
      name: "session",
    })
      .then((response) => {
        console.log(response);
        setSession(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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

  const handleChanged = useCallback(
    async (color: Color) => {
      const content = window.getSelection()?.toString().trim();
      if (!content || !session) {
        return;
      }
      const result = await sendToBackground<SaveHighlightRequest>({
        name: "highlight/save",
        body: {
          url: window.location.href,
          title: document.title,
          highlight: {
            color,
            content,
          },
        },
      });
      console.log(result);
    },
    [session],
  );

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
        <div className="whl-p-2">
          <Colors onChanged={handleChanged} />
        </div>
      </Card>
    </div>
  );
};

export default ContextMenu;
