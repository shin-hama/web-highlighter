"use client";

import type { PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce } from "react-use";

import type {
  GetHighlightsOnAPageResponse,
  HighlightWithLabelAndPositionAndTag,
} from "@whl/common-types";
import type { Position } from "@whl/db";

const HighlightsContext = createContext<
  HighlightWithLabelAndPositionAndTag[] | null
>(null);

// TODO: SetState ではなく Reducer を使って削除や更新処理を作成する
const SetHighlightsContext = createContext<React.Dispatch<
  React.SetStateAction<HighlightWithLabelAndPositionAndTag[]>
> | null>(null);

export const HighlightsProvider = ({ children }: PropsWithChildren) => {
  const [highlights, setHighlights] = useState<
    HighlightWithLabelAndPositionAndTag[]
  >([]);

  const mark = useCallback((position: Position, color: string) => {
    // body 要素から position.startTagName に一致するタグの中から、position.startIndex 番目の要素を探す
    const startContainer = document.body.getElementsByTagName(
      position.startTagName,
    )[position.startIndex];
    const endContainer = document.body.getElementsByTagName(
      position.endTagName,
    )[position.endIndex];
    if (!startContainer || !endContainer) {
      console.warn("startContainer or endContainer is not found.");
      return;
    }

    const range = document.createRange();
    range.setStart(startContainer, position.startOffset);
    range.setEnd(endContainer, position.endOffset);

    const elm = document.createElement("span");
    elm.style.backgroundColor = color;
    elm.style.borderRadius = "2px";
    elm.style.padding = "2px 2px";
    elm.style.margin = "0 1px";
    range.surroundContents(elm);
  }, []);

  useEffect(() => {
    highlights.forEach((marker) => {
      if (marker.position) {
        mark(marker.position, marker.label.color);
      }
    });
  }, [mark, highlights]);

  useEffectOnce(() => {
    sendToBackground<undefined, GetHighlightsOnAPageResponse>({
      name: "page/highlights",
    })
      .then((results) => {
        console.log(results);

        setHighlights(results);
      })
      .catch(console.error);
  });

  return (
    <HighlightsContext.Provider value={highlights}>
      <SetHighlightsContext.Provider value={setHighlights}>
        {children}
      </SetHighlightsContext.Provider>
    </HighlightsContext.Provider>
  );
};

export const useHighlightsContext = () => {
  const Highlights = useContext(HighlightsContext);

  if (!Highlights) {
    throw new Error("HighlightsContext does not wrapped");
  }

  return Highlights;
};

export const useSetHighlightsContext = () => {
  const setHighlights = useContext(SetHighlightsContext);

  if (!setHighlights) {
    throw new Error("SetHighlightsContext does not wrapped");
  }

  return setHighlights;
};
