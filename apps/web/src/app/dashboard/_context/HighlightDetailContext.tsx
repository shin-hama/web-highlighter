"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

const HighlightDetailContext = createContext<string | null | undefined>(
  undefined,
);
const SetHighlightDetailContext = createContext<
  React.Dispatch<React.SetStateAction<string | null>> | undefined
>(undefined);

export const HighlightDetailProvider = ({ children }: PropsWithChildren) => {
  const [highlightId, setHighlightId] = useState<string | null>(null);
  return (
    <HighlightDetailContext.Provider value={highlightId}>
      <SetHighlightDetailContext.Provider value={setHighlightId}>
        {children}
      </SetHighlightDetailContext.Provider>
    </HighlightDetailContext.Provider>
  );
};

export const useHighlightDetail = () => {
  const context = useContext(HighlightDetailContext);
  if (context === undefined) {
    throw new Error(
      "useHighlightDetail must be used within a HighlightDetailProvider",
    );
  }
  return context;
};

export const useSetHighlightDetail = () => {
  const context = useContext(SetHighlightDetailContext);
  if (context === undefined) {
    throw new Error(
      "useSetHighlightDetail must be used within a HighlightDetailProvider",
    );
  }
  return context;
};
