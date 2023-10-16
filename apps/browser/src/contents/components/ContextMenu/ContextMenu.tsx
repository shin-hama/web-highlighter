import { useCallback, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEvent } from "react-use";

import type { CreateHighlightRequest } from "@whl/common-types";
import type { Label } from "@whl/db";
import { Card } from "@whl/ui/components/ui/card";

import { useSession } from "~/hooks/useSession";
import { APP_HOST } from "~/lib/config";
import Labels from "./Labels";

const ContextMenu = () => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const { session, status } = useSession();

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

      // 現在選択されているテキストをハイライトする
      const range = selection.getRangeAt(0);
      const highlight = document.createElement("span");
      highlight.style.backgroundColor = label.color;
      highlight.style.borderRadius = "2px";
      highlight.style.padding = "2px 2px";
      highlight.style.margin = "0 1px";
      range.surroundContents(highlight);

      try {
        const result = await sendToBackground<CreateHighlightRequest>({
          name: "highlight/save",
          body: {
            page: {
              // build url removed query and flagment
              url: window.location.origin + window.location.pathname,
              title: document.title,
            },
            highlight: {
              content,
              labelId: label.id,
            },
          },
        });
        if (!result) {
          highlight.remove();
        }
      } catch {
        // ハイライトを削除する
        highlight.remove();
      }
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
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="whl-p-2">
          <Labels onChanged={handleChanged} />
        </div>
        <div className="whl-flex whl-flex-row whl-px-3 whl-pb-1">
          <a
            href={`${APP_HOST}/dashboard`}
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
