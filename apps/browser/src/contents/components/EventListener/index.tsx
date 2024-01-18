import type { PropsWithChildren } from "react";
import { useEvent } from "react-use";

import { MARKER_CLASS_NAME } from "~/core/resources";

const EventListener = ({ children }: PropsWithChildren) => {
  useEvent("click", (e: PointerEvent) => {
    if (
      e.target instanceof HTMLElement &&
      e.target?.matches(`.${MARKER_CLASS_NAME}`)
    ) {
      e.preventDefault();
      console.log("click marker");
    }
  });

  return <>{children}</>;
};

export default EventListener;
