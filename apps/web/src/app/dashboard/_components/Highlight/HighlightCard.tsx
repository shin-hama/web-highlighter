"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@whl/ui/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@whl/ui/components/ui/dialog";

import { Actions } from "./Actions";
import Editor from "./Editor";
import HighlightContent from "./HighlightContent";
import { useTagOnHighlight } from "./hooks/useTag";
import QuoteSource from "./ReferencedFooter";
import TagBadge from "./TagBadge";

const HighlightCard = (props: HighlightWithLabelAndPageAndTag) => {
  const { data: revalidatedHighlight, mutate } =
    useSWR<HighlightWithLabelAndPageAndTag>(`/api/highlights/${props.id}`, {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    });
  const highlight = useMemo(
    () => revalidatedHighlight ?? props,
    [revalidatedHighlight, props],
  );
  const { removeTag } = useTagOnHighlight(highlight.id);

  const handleRemoveTag = useCallback(
    async (tagId: string) => {
      void mutate({
        ...highlight,
        HighlightOnTag: highlight.HighlightOnTag.filter(
          ({ tag }) => tag.id !== tagId,
        ),
      });
      await removeTag(tagId);
    },
    [removeTag, mutate, highlight.id],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
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
          {highlight.HighlightOnTag.length > 0 && (
            <CardContent>
              <div className="whl-flex whl-flex-row whl-flex-wrap whl-items-center whl-gap-1">
                {highlight.HighlightOnTag.map(({ tag }) => (
                  <TagBadge
                    key={tag.id}
                    tag={tag}
                    onRemoved={handleRemoveTag}
                  />
                ))}
              </div>
            </CardContent>
          )}
          <CardFooter>
            <div className="whl-invisible group-hover/highlight:whl-visible">
              <Actions {...highlight} />
            </div>
          </CardFooter>
          <QuoteSource {...highlight.page} />
        </Card>
      </DialogTrigger>
      <DialogContent className="whl-p-0">
        <Editor {...highlight} />
      </DialogContent>
    </Dialog>
  );
};

export default HighlightCard;
