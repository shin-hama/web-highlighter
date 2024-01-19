import { useMemo, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";

import type { CreateHighlightRequest } from "@whl/common-types";
import type { Label } from "@whl/db";

import type { IncompleteHighlight, MaybeHighlight } from "../types";
import { useMarker } from "./useMarker";

interface Actions {
  setLabel: (label: Label) => void;
  save: (tags: { name: string }[]) => void;
}

export const useHighlight = (highlight: MaybeHighlight): Actions => {
  const [HighlightDTO, setHighlightDTO] = useState<IncompleteHighlight>({
    content: highlight.content,
    url: highlight.url,
    position: highlight.position!,
    labelId: highlight.labelId,
    id: highlight.id,
  });

  const { mark } = useMarker();

  const actions = useMemo<Actions>(() => {
    const setLabel = (label: Label) => {
      const selection = window.getSelection();
      if (!selection) {
        return;
      }

      const content = selection?.toString().trim();
      if (content.length === 0) {
        return;
      }

      // 現在選択されているテキストをハイライトする
      mark(HighlightDTO.position, label.color);
      setHighlightDTO((prev) => ({
        ...prev,
        labelId: label.id,
      }));
    };

    const save = (tags: { name: string }[]) => {
      // Label と Tag を作成する
      if (!HighlightDTO.labelId) {
        return;
      }

      sendToBackground<CreateHighlightRequest>({
        name: "highlight/save",
        body: {
          page: {
            // build url removed query and fragment
            url: window.location.origin + window.location.pathname,
            title: document.title,
          },
          highlight: {
            content: HighlightDTO.content,
            labelId: HighlightDTO.labelId,
            position: HighlightDTO.position,
            url: HighlightDTO.url,
          },
          tags: tags,
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return {
      save,
      setLabel,
    };
  }, [HighlightDTO, mark]);

  return actions;
};
