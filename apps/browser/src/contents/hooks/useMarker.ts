import { useMemo } from "react";

import type { Position } from "@whl/db";

import { createMarker } from "../lib/create-marker";
import { getTextNodesInRange } from "../lib/get-text-nodes";
import { findNodes } from "../lib/validate-position";

interface UseMarker {
  mark: (
    position: Pick<
      Position,
      | "endIndex"
      | "endOffset"
      | "endTagName"
      | "startIndex"
      | "startOffset"
      | "startTagName"
    >,
    color: string,
  ) => void;
}
export const useMarker = (): UseMarker => {
  const actions = useMemo<UseMarker>(() => {
    const mark: UseMarker["mark"] = (position, color) => {
      const nodes = findNodes(position);
      if (nodes === null) {
        return;
      }

      const { startNode, endNode } = nodes;
      const range = document.createRange();
      range.setStart(startNode, position.startOffset);
      range.setEnd(endNode, position.endOffset);

      const textNodes = getTextNodesInRange(range);

      textNodes.forEach((textNode) => {
        createMarker(textNode, color, {
          start:
            textNode === range.startContainer ? range.startOffset : undefined,
          end: textNode === range.endContainer ? range.endOffset : undefined,
        });
      });
    };

    return {
      mark,
    };
  }, []);

  return actions;
};
