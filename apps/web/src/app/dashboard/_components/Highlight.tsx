import { Trash2 } from "lucide-react";

import type { HighlightWithLabel } from "@whl/common-types";
import { Button } from "@whl/ui/components/ui/Button";

const Highlight = ({ label, content }: HighlightWithLabel) => {
  return (
    <div className="whl-group/highlight whl-flex whl-flex-row whl-items-stretch whl-gap-x-2">
      <div
        className="whl-w-4 whl-flex-shrink-0"
        style={{ backgroundColor: label.color }}
      ></div>
      <div className="whl-relative whl-flex whl-flex-grow whl-flex-row whl-items-center">
        <span className="whl-py-1">{content}</span>
        <div className="whl-invisible whl-absolute whl-right-2 whl-top-1 group-hover/highlight:whl-visible">
          <Button size="icon" variant="ghost">
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Highlight;
