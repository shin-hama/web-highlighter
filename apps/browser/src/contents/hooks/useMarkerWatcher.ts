import { useEvent } from "react-use";

import { MARKER_CLASS_NAME } from "~/core/resources";

interface Props {
  onClicked: (e: PointerEvent) => void;
}
export const useMarkerWatcher = ({ onClicked }: Props) => {
  useEvent("click", (e: PointerEvent) => {
    if (
      e.target instanceof HTMLElement &&
      e.target?.matches(`.${MARKER_CLASS_NAME}`)
    ) {
      e.preventDefault();
      console.log("click marker");
      onClicked(e);
    }
  });
};
