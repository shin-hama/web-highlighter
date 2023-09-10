import cssText from "data-text:@whl/ui/app/globals.css";
import type { PlasmoCSConfig } from "plasmo";

import "@whl/ui/app/globals.css";

import ContextMenu from "./features/ContextMenu";

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
  return <ContextMenu />;
};

export default PlasmoOverlay;
