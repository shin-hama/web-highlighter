"use client";

import { useEffect, useRef } from "react";

/**
 * Infinity Scroll を実装する際のロジック部分
 * IntersectionObserver を利用して、指定した要素が画面内に入ったら callback を実行する
 * スクロール判定の要素に戻り値の ref を指定する
 * @param callback observeTarget が画面内に入ったら実行する関数
 * @returns
 */
export const useInfinityScroll = (callback: () => void) => {
  const observeTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          callback();
        }
      },
      { threshold: 1.0 },
    );

    const observerRef = observeTarget.current;
    if (observerRef) {
      observer.observe(observerRef);
    }
    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [callback]);

  return observeTarget;
};
