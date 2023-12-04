"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

/**
 * @description Query パラメータからラベルのフィルターを取得する
 */
export const useLabelsFilter = () => {
  const searchParams = useSearchParams();
  return useMemo(() => {
    const labels = searchParams.get("labels");
    if (!labels) {
      return [];
    }
    return labels.split(",");
  }, [searchParams]);
};
