import { useMemo } from "react";

import type { Position } from "@whl/db";

import { changeMarkerColor, createMarkers } from "../lib/create-marker";
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
  ) => HTMLElement[];
  /**
   * マーカーの色を変える
   */
  changeColor: (marker: HTMLElement, color: string) => HTMLElement;
}
export const useMarker = (): UseMarker => {
  const actions = useMemo<UseMarker>(() => {
    const mark: UseMarker["mark"] = (position, color) => {
      const nodes = findNodes(position);
      if (nodes === null) {
        return [];
      }

      const { startElement, endElement } = nodes;
      return createMarkers(
        startElement,
        endElement,
        color,
        position.startOffset,
        position.endOffset,
      );
    };

    const changeColor: UseMarker["changeColor"] = (marker, color) => {
      return changeMarkerColor(marker, color);
    };

    return {
      mark,
      changeColor,
    };
  }, []);

  return actions;
};
