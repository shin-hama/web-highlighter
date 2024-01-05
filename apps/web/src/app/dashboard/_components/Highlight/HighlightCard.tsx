import { HashIcon } from "lucide-react";

import type { HighlightWithLabelAndTag } from "@whl/common-types";
import { Badge } from "@whl/ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@whl/ui/components/ui/card";

import { Actions } from "./Actions";

const HighlightCard = ({
  id,
  label,
  content,
  pageId,
  url,
  HighlightOnTag,
}: HighlightWithLabelAndTag) => {
  return (
    <Card className="whl-group/highlight">
      <CardHeader>
        <div className="whl-flex whl-flex-row whl-gap-2">
          <div
            className="whl-w-2 whl-flex-shrink-0"
            style={{ backgroundColor: label.color }}
          />
          <span className="">{content}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="whl-flex whl-flex-row whl-items-center whl-gap-x-1">
          {HighlightOnTag.map(({ tag }) => (
            <Badge key={tag.id}>
              <HashIcon size={12} /> {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="whl-invisible whl-absolute whl-right-2 whl-top-1 group-hover/highlight:whl-visible">
          <Actions id={id} pageId={pageId} url={url} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default HighlightCard;
