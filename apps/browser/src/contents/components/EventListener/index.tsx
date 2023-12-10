import type { PropsWithChildren } from "react";
import { useEvent } from "react-use";

const EventListener = ({ children }: PropsWithChildren) => {
  useEvent("click", (e: PointerEvent) => {
    if (
      e.target instanceof HTMLElement &&
      e.target?.matches(".web-highlighter-marker")
    ) {
      e.preventDefault();
      console.log("click marker");
    }
  });

  return <>{children}</>;
};

export default EventListener;
