"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

import type { Page } from "@whl/db";

const PageDetailContext = createContext<Page | null | undefined>(undefined);
const SetPageDetailContext = createContext<
  React.Dispatch<React.SetStateAction<Page | null>> | undefined
>(undefined);

export const DetailProvider = ({ children }: PropsWithChildren) => {
  const [page, setPage] = useState<Page | null>(null);
  return (
    <PageDetailContext.Provider value={page}>
      <SetPageDetailContext.Provider value={setPage}>
        {children}
      </SetPageDetailContext.Provider>
    </PageDetailContext.Provider>
  );
};

export const usePageDetail = () => {
  const context = useContext(PageDetailContext);
  if (context === undefined) {
    throw new Error("usePageDetail must be used within a DetailProvider");
  }
  return context;
};

export const useSetPageDetail = () => {
  const context = useContext(SetPageDetailContext);
  if (context === undefined) {
    throw new Error("useSetPageDetail must be used within a DetailProvider");
  }
  return context;
};
