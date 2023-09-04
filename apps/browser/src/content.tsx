import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";

import ContextMenu from "~features/ContextMenu";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  return (
    <div>
      <ContextMenu />
    </div>
  );
};

export default PlasmoOverlay;
