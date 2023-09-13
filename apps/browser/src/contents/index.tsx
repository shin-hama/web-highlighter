import cssText from "data-text:@whl/ui/app/globals.css";
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo";

import ContextMenu from "./components/ContextMenu";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
};

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  return <ContextMenu />;
};

export default PlasmoOverlay;
