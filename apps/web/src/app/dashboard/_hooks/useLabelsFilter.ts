"use client";

import { useMemo } from "react";

/**
 * @description Query パラメータからラベルのフィルターを取得する
 */
export const useLabelsFilter = () => {
  return useMemo(() => {
    const labels = new URLSearchParams(window.location.search).get("labels");
    if (!labels) {
      return [];
    }
    return labels.split(",");
  }, []);
};
