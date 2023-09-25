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
    <div className="whl-flex whl-flex-col whl-space-y-2">
      {highlights.map((highlight) => (
        <div key={highlight.id}>{highlight.content}</div>
      ))}
    </div>
  );
};

export default Highlights;
