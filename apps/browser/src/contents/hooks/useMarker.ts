import { useMemo } from "react";

import type { Position } from "@whl/db";

import { createMarkers } from "../lib/create-marker";
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

      const { startElement, endElement } = nodes;
      createMarkers(
        startElement,
        endElement,
        color,
        position.startOffset,
        position.endOffset,
      );
    };

    return {
      mark,
    };
  }, []);

  return actions;
};
