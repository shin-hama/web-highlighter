import { useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce } from "react-use";

import type { HighlightWithLabelAndPage } from "@whl/common-types";

const Highlights = () => {
  const [highlights, setHighlights] = useState<HighlightWithLabelAndPage[]>([]);

  useEffectOnce(() => {
    console.log("get all labels");
    sendToBackground<undefined, HighlightWithLabelAndPage[]>({
      name: "highlight/list",
    })
      .then((response) => {
        setHighlights(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <div className="whl-flex whl-flex-col whl-gap-y-2">
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          className="whl-flex whl-flex-row whl-items-stretch whl-gap-x-2"
        >
          <div
            className="whl-w-4 whl-flex-shrink-0"
            style={{ backgroundColor: highlight.label.color }}
          ></div>
          <div className="whl-relative whl-flex whl-flex-grow whl-flex-row whl-items-center">
            <p className="whl-py-1">{highlight.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Highlights;
