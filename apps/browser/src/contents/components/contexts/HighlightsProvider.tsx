import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce } from "react-use";

import type {
  GetHighlightsOnAPageResponse,
  HighlightWithLabelAndPositionAndTag,
} from "@whl/common-types";

import type { RequestHighlightsOnAPageParams } from "~/background/messages/page/highlights";
import { useMarker } from "~/contents/hooks/useMarker";

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
  const { mark } = useMarker();

  useEffect(() => {
    console.log("highlights", highlights);
    highlights.forEach((marker) => {
      if (marker.position) {
        mark(marker.position, marker.label.color);
      }
    });
  }, [mark, highlights]);

  useEffectOnce(() => {
    sendToBackground<
      RequestHighlightsOnAPageParams,
      GetHighlightsOnAPageResponse
    >({
      name: "page/highlights",
      body: {
        url: window.location.origin + window.location.pathname,
      },
    })
      .then((results) => {
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
