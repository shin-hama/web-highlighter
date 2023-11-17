"use client";

import { useMemo, useState } from "react";

interface Marker {
  id: string;
}

type UseMarkers = readonly [
  markers: Marker[],
  actions: {
    mark: () => void;
  },
];

export const useMarkers = (): UseMarkers => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const actions = useMemo(() => {
    const mark = () => {
      const selection = window.getSelection();
      if (!selection) {
        return;
      }

      const range = selection.getRangeAt(0);
      const elm = document.createElement("span");
      elm.style.backgroundColor = "red";
      elm.style.borderRadius = "2px";
      elm.style.padding = "2px 2px";
      elm.style.margin = "0 1px";
      range.surroundContents(elm);
    };

    return { mark };
  }, []);
  return [markers, actions] as const;
};
