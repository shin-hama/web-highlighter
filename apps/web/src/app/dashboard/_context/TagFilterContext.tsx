"use client";

import React from "react";
import { useList } from "react-use";
import type { ListActions } from "react-use/lib/useList";

import type { Tag } from "@whl/db";

type TagFilterContextType = readonly [Tag[], ListActions<Tag>];

const TagFilterContext = React.createContext<TagFilterContextType | null>(null);

export const TagFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const tags = useList<Tag>([]);
  return (
    <TagFilterContext.Provider value={tags}>
      {children}
    </TagFilterContext.Provider>
  );
};

export const useTagFilter = () => {
  const context = React.useContext(TagFilterContext);
  if (context === null) {
    throw new Error("useTagFilter must be used within a TagFilterProvider");
  }
  return context;
};
