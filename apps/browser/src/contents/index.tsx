// for shadow dom
import cssText from "data-text:@whl/ui/app/globals.css";
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo";

import { APP_HOST } from "~/lib/config";
import ContextMenu from "./components/ContextMenu";
import { HighlightsProvider } from "./components/contexts/HighlightsProvider";
import VerifyAvailable from "./components/VerifyAvailable";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  exclude_matches: ["http://localhost:3000/*", `${APP_HOST}/*`],
  all_frames: true,
};

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  return (
    <VerifyAvailable>
      <HighlightsProvider>
        <ContextMenu />
      </HighlightsProvider>
    </VerifyAvailable>
  );
};
export default PlasmoOverlay;
