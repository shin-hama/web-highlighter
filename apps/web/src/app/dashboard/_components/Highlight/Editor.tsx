"use client";

import { useCallback } from "react";
import type { PropsWithChildren } from "react";
import { PlusIcon } from "lucide-react";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import { Button } from "@whl/ui/components/ui/button";
import { Card } from "@whl/ui/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@whl/ui/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@whl/ui/components/ui/popover";
import { ScrollArea } from "@whl/ui/components/ui/scroll-area";
import { Textarea } from "@whl/ui/components/ui/textarea";

import { Actions } from "./Actions";
import AddTagsForm from "./AddTagsForm";
import HighlightContent from "./HighlightContent";
import { useHighlight } from "./hooks/useHighlight";
import QuoteSource from "./QuoteSource";
import TagBadge from "./TagBadge";

const MAX_NOTE_LENGTH = 10000;

interface Props {
  highlight: HighlightWithLabelAndPageAndTag;
}
const EditorDialog = ({
  highlight: initialHighlight,
  children,
}: PropsWithChildren<Props>) => {
  const { highlight, isLoading, update, commit, removeTag } = useHighlight(
    initialHighlight.id,
    initialHighlight,
  );

  const handleClose = useCallback(() => {
    void commit();
  }, [commit]);

  if (!highlight || isLoading) {
    return <>{children}</>;
  }

  const { content, HighlightOnTag, page } = highlight;

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="whl-p-0">
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
              <Textarea
                value={highlight.note ?? undefined}
                maxLength={MAX_NOTE_LENGTH}
                onError={console.error}
                onChange={(e) =>
                  update({
                    highlight: {
                      note: e.target.value,
                    },
                  })
                }
                placeholder="Enter a note..."
                className=""
              />
              <div className="whl-mt-1 whl-w-full whl-text-end">
                <p className="whl-text-xs whl-text-gray-500">
                  {highlight.note?.length ?? 0}/{MAX_NOTE_LENGTH}
                </p>
              </div>
            </div>
            <div className="whl-flex whl-flex-row whl-items-center whl-gap-1 whl-px-4 whl-py-2">
              {HighlightOnTag.map(({ tag }) => (
                <TagBadge key={tag.id} tag={tag} onRemoved={removeTag} />
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
      </DialogContent>
    </Dialog>
  );
};

export default EditorDialog;
