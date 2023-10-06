import type { HighlightWithLabel } from "@whl/common-types";

import { Actions } from "./Actions";

const Highlight = ({ id, label, content }: HighlightWithLabel) => {
  return (
    <div className="whl-group/highlight whl-flex whl-flex-row whl-items-stretch whl-gap-x-2">
      <div
        className="whl-w-4 whl-flex-shrink-0"
        style={{ backgroundColor: label.color }}
      ></div>
      <div className="whl-relative whl-flex whl-flex-grow whl-flex-row whl-items-center">
        <span className="whl-py-2">{content}</span>
        <div className="whl-invisible whl-absolute whl-right-2 whl-top-1 group-hover/highlight:whl-visible">
          <Actions id={id} />
        </div>
      </div>
    </div>
  );
};

export default Highlight;
