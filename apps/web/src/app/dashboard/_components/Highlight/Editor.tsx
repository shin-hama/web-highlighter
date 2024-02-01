import { Button } from "@ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { PlusIcon } from "lucide-react";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import { Card } from "@whl/ui/components/ui/card";
import { Textarea } from "@whl/ui/components/ui/textarea";

import { Actions } from "./Actions";
import AddTagsForm from "./AddTagsForm";
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
      className="whl-flex whl-max-h-[80vh] whl-flex-col whl-overflow-hidden"
      style={{
        backgroundColor: highlight.label.color,
      }}
    >
      <div className="whl-p-4">
        <HighlightContent content={content} />
      </div>
      <ScrollArea className="whl-flex-1">
        <div className="whl-px-4 whl-py-2">
          <Textarea placeholder="Enter a note..." className="whl-h-[30vh]" />
        </div>
        <div className="whl-flex whl-flex-row whl-items-center whl-gap-1 whl-px-4 whl-py-2">
          {HighlightOnTag.map(({ tag }) => (
            <TagBadge key={tag.id} tag={tag} onRemoved={handleRemoveTag} />
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                className="whl-aspect-square whl-h-5 whl-w-5 whl-rounded-full"
              >
                <PlusIcon size={12} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              avoidCollisions={false}
              side="bottom"
              align="start"
              className="whl-w-auto whl-px-0 whl-py-1"
            >
              <AddTagsForm
                addedTags={HighlightOnTag.map((relation) => relation.tag)}
                highlightId={highlight.id}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="whl-px-4 whl-py-2">
          <Card>
            <QuoteSource {...page} />
          </Card>
        </div>
      </ScrollArea>
      <div className="whl-px-2 whl-py-2">
        <Actions {...highlight} />
      </div>
    </div>
  );
};

export default Editor;
