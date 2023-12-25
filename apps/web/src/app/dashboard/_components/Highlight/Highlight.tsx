import { HashIcon } from "lucide-react";

import type { HighlightWithLabelAndTag } from "@whl/common-types";
import { Badge } from "@whl/ui/components/ui/badge";

import { Actions } from "./Actions";

const Highlight = ({
  id,
  label,
  content,
  pageId,
  url,
  HighlightOnTag,
}: HighlightWithLabelAndTag) => {
  return (
    <div className="whl-group/highlight whl-relative whl-flex whl-flex-row whl-items-stretch whl-gap-x-2 ">
      <div
        className="whl-w-4 whl-flex-shrink-0"
        style={{ backgroundColor: label.color }}
      ></div>
      <div className="whl-flex whl-flex-grow whl-flex-col whl-items-start whl-gap-2 whl-py-2">
        <span className="">{content}</span>
        <div className="whl-flex whl-flex-row whl-items-center whl-gap-x-1">
          {HighlightOnTag.map(({ tag }) => (
            <Badge key={tag.id}>
              <HashIcon size={12} /> {tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="whl-invisible whl-absolute whl-right-2 whl-top-1 group-hover/highlight:whl-visible">
        <Actions id={id} pageId={pageId} url={url} />
      </div>
    </div>
  );
};

export default Highlight;
