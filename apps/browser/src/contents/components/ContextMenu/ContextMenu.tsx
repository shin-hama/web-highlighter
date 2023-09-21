import { useCallback, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce, useEvent } from "react-use";

import type { Session } from "@whl/auth";
import type { CreateHighlightRequest } from "@whl/common-types";
import type { Label } from "@whl/db";
import { Card } from "@whl/ui/components/ui/Card";

import Labels from "./Colors";

const ContextMenu = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [session, setSession] = useState<Session | undefined>(undefined);

  useEffectOnce(() => {
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
  });

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
    async (label: Label) => {
      const content = window.getSelection()?.toString().trim();
      if (!content || !session) {
        return;
      }
      const result = await sendToBackground<CreateHighlightRequest>({
        name: "highlight/save",
        body: {
          page: {
            url: window.location.href,
            title: document.title,
          },
          highlight: {
            content,
            labelId: label.id,
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
          <Labels onChanged={handleChanged} />
        </div>
        <div className="whl-flex whl-flex-row">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="whl-font-mono whl-text-sm whl-font-bold"
          >
            Highlighter
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ContextMenu;
