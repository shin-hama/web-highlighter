import { useCallback, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEvent } from "react-use";

import type { CreateHighlightRequest } from "@whl/common-types";
import type { Label } from "@whl/db";
import { Card } from "@whl/ui/components/ui/Card";

import { useSession } from "~/hooks/useSession";
import Labels from "./Labels";

const ContextMenu = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const { session, status } = useSession();

  const onMouseUp = (event: React.MouseEvent) => {
    const selectedText = window.getSelection()?.toString().trim();

    // TODO: 選択した要素が input などの場合は表示しない
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
      const selection = window.getSelection();
      if (!selection || !session) {
        return;
      }

      const content = selection?.toString().trim();
      if (content.length === 0) {
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

  if (status !== "authenticated") {
    return <></>;
  }

  return (
    <div
      className={`${open ? "" : "whl-hidden"} whl-absolute whl-z-50`}
      // tailwind を使うと動的に移動できなかったので、style で指定
      style={{
        left: pos.x,
        top: pos.y,
      }}
    >
      <Card
        onClick={() => {
          console.log("Clicked");
        }}
      >
        <div className="whl-p-2">
          <Labels onChanged={handleChanged} />
        </div>
        <div className="whl-flex whl-flex-row whl-px-3 whl-pb-1">
          <a
            href="http://localhost:3000/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="whl-font-mono whl-text-sm whl-font-bold"
          >
            Dashboard
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ContextMenu;
