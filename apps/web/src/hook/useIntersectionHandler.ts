import type { RefObject } from "react";
import { useEffect, useState } from "react";

export const useIntersectionHandler = (
  ref: RefObject<HTMLElement>,
  callback?: (entry?: IntersectionObserverEntry) => void,
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setIsIntersecting(true);
        callback?.(entries[0]);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      setIsIntersecting(false);
      observer.disconnect();
    };
  }, [ref, callback]);

  return isIntersecting;
};
