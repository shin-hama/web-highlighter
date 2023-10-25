import { useCallback, useMemo, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

import type { CreateHighlightRequest } from "@whl/common-types";
import type { Label } from "@whl/db";

import { useSession } from "~/hooks/useSession";

export const useLabel = (): readonly [
  Label | null,
  (label: Label) => Promise<void>,
] => {
  const { status } = useSession();

  const [selected, setSelected] = useState<Label | null>(null);

  const handleChanged = useCallback(
    async (label: Label) => {
      const selection = window.getSelection();
      if (!selection || status !== "authenticated") {
        return;
      }

      const content = selection?.toString().trim();
      if (content.length === 0) {
        return;
      }

      setSelected(label);

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
              // build url removed query and fragment
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
          setSelected(null);
        }
      } catch {
        // ハイライトを削除する
        highlight.remove();
        setSelected(null);
      }
    },
    [status],
  );

  return useMemo(
    () => [selected, handleChanged] as const,
    [selected, handleChanged],
  );
};
