import { Button } from "@ui/components/ui/button";
import { PlusIcon } from "lucide-react";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import { Card } from "@whl/ui/components/ui/card";
import { Textarea } from "@whl/ui/components/ui/textarea";

import { Actions } from "./Actions";
import HighlightContent from "./HighlightContent";
import { useHighlight } from "./hooks/useHighlight";
import QuoteSource from "./ReferencedFooter";
import TagBadge from "./TagBadge";

const Editor = (props: HighlightWithLabelAndPageAndTag) => {
  const { highlight, isLoading, handleRemoveTag } = useHighlight(
    props.id,
    props,
  );

  if (isLoading || !highlight) {
    return <></>;
  }
  const { content, HighlightOnTag, page } = highlight;
  return (
    <div
      className=""
      style={{
        backgroundColor: highlight.label.color,
      }}
    >
      <div>
        <div className="whl-p-4">
          <HighlightContent content={content} />
        </div>
        <div className="whl-px-4 whl-py-2">
          <Textarea placeholder="Enter a note..." className="" />
        </div>
        <div className="whl-flex whl-flex-row whl-items-center whl-gap-1 whl-px-4 whl-py-2">
          {HighlightOnTag.map(({ tag }) => (
            <TagBadge key={tag.id} tag={tag} onRemoved={handleRemoveTag} />
          ))}
          <Button
            size="icon"
            className="whl-aspect-square whl-h-5 whl-w-5 whl-rounded-full"
          >
            <PlusIcon size={12} />
          </Button>
        </div>
        <div className="whl-px-4 whl-py-2">
          <Card>
            <QuoteSource {...page} />
          </Card>
        </div>
      </div>
      <div className="whl-px-2 whl-py-2">
        <Actions {...highlight} />
      </div>
    </div>
  );
};

export default Editor;
