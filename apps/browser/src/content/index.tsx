import { useEffect } from "react";
import cssText from "data-text:@whl/ui/app/globals.css";
import type { PlasmoCSConfig } from "plasmo";

import "@whl/ui/app/globals.css";

import { sendToBackground } from "@plasmohq/messaging";

import ContextMenu from "./components/ContextMenu";

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
  useEffect(() => {
    sendToBackground({
      name: "session",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <ContextMenu />;
};

export default PlasmoOverlay;
