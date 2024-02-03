"use client";

import { useMemo } from "react";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@whl/ui/components/ui/card";
import { Skeleton } from "@whl/ui/components/ui/skeleton";

import { Actions } from "./Actions";
import EditorDialog from "./Editor";
import HighlightContent from "./HighlightContent";
import { useHighlight } from "./hooks/useHighlight";
import QuoteSource from "./QuoteSource";
import TagBadge from "./TagBadge";

const HighlightCard = (props: HighlightWithLabelAndPageAndTag) => {
  const {
    highlight,
    isLoading,
    removeTag: handleRemoveTag,
  } = useHighlight(props.id, props);

  const showNote = useMemo<boolean>(() => !!highlight?.note, [highlight]);
  const showTags = useMemo<boolean>(
    () => !!highlight && highlight.HighlightOnTag.length > 0,
    [highlight],
  );
  console.log(showTags, highlight);

  const showContent = useMemo(() => {
    return showNote || showTags;
  }, [showNote, showTags]);

  if (!highlight && isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="whl-h-16" />
        </CardHeader>
      </Card>
    );
  }

  if (!highlight) {
    return <></>;
  }

  return (
    <EditorDialog highlight={highlight}>
      <Card
        id={`highlight-card-${highlight.id}`}
        className="whl-group/highlight whl-cursor-pointer"
        style={{
          backgroundColor: highlight.label.color,
        }}
      >
        <CardHeader>
          <HighlightContent content={highlight.content} />
        </CardHeader>
        {showContent && (
          <CardContent className="whl-space-y-2">
            {showNote && <p>{highlight.note}</p>}
            {showTags && (
              <div className="whl-flex whl-flex-row whl-flex-wrap whl-items-center whl-gap-1">
                {highlight.HighlightOnTag.map(({ tag }) => (
                  <TagBadge
                    key={tag.id}
                    tag={tag}
                    onRemoved={handleRemoveTag}
                  />
                ))}
              </div>
            )}
          </CardContent>
        )}
        <CardFooter>
          <div className="whl-invisible group-hover/highlight:whl-visible">
            <Actions {...highlight} />
          </div>
        </CardFooter>
        <QuoteSource {...highlight.page} />
      </Card>
    </EditorDialog>
  );
};

export default HighlightCard;
