"use client";

import { useMemo } from "react";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@whl/ui/components/ui/card";

import HighlightContent from "~/app/dashboard/_components/Highlight/HighlightContent";
import QuoteSource from "~/app/dashboard/_components/Highlight/QuoteSource";
import TagBadge from "~/app/dashboard/_components/Highlight/TagBadge";

const DeletedHighlight = (highlight: HighlightWithLabelAndPageAndTag) => {
  const showNote = useMemo<boolean>(() => !!highlight?.note, [highlight]);
  const showTags = useMemo<boolean>(
    () => !!highlight && highlight.HighlightOnTag.length > 0,
    [highlight],
  );

  const showContent = useMemo(() => {
    return showNote || showTags;
  }, [showNote, showTags]);

  return (
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
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}
        </CardContent>
      )}
      <CardFooter>
        <div className="whl-invisible group-hover/highlight:whl-visible"></div>
      </CardFooter>
      <QuoteSource {...highlight.page} />
    </Card>
  );
};

export default DeletedHighlight;
