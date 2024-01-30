"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@ui/components/ui/button";
import { ExternalLinkIcon, HashIcon, XIcon } from "lucide-react";
import useSWR from "swr";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import { Badge } from "@whl/ui/components/ui/badge";
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
import { useTagOnHighlight } from "./hooks/useTag";

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
            <div className="whl-flex whl-flex-row whl-gap-2">
              <div className="whl-w-1 whl-flex-shrink-0 whl-bg-gray-400" />
              <p className="whl-text-gray-700">{highlight.content}</p>
            </div>
          </CardHeader>
          {highlight.HighlightOnTag.length > 0 && (
            <CardContent>
              <div className="whl-flex whl-flex-row whl-flex-wrap whl-items-center whl-gap-1">
                {highlight.HighlightOnTag.map(({ tag }) => (
                  <Badge
                    key={tag.id}
                    className="whl-group/tag whl-relative whl-gap-0.5"
                  >
                    <HashIcon
                      size={12}
                      className="whl-visible group-hover/tag:whl-hidden"
                    />
                    {tag.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="whl-hidden whl-h-3 whl-w-3 group-hover/tag:whl-block"
                      onClick={() => handleRemoveTag(tag.id)}
                    >
                      <XIcon size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          )}
          <CardFooter>
            <div className="whl-invisible group-hover/highlight:whl-visible">
              <Actions {...highlight} />
            </div>
          </CardFooter>
          <div className="whl-relative whl-bg-gray-100 whl-px-2 whl-py-1">
            <div className="whl-flex whl-w-full whl-flex-row whl-items-center whl-space-x-4">
              <Image
                src={`https://www.google.com/s2/favicons?sz=64&domain=${
                  new URL(highlight.page.url).hostname
                }`}
                alt={`Favicon for ${highlight.page.title}`}
                width={32}
                height={32}
                className="whl-flex-shrink-0"
              />
              <div className="whl-flex whl-w-full whl-flex-1 whl-flex-col whl-overflow-hidden">
                <span className="whl-truncate">{highlight.page.title}</span>
                <span className="whl-truncate whl-text-xs whl-font-light">
                  {new URL(highlight.page.url).hostname}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon_xs"
              className="whl-absolute whl-right-1 whl-top-1 hover:whl-bg-gray-200"
              color="primary"
              asChild
            >
              <Link
                href={highlight.page.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLinkIcon size={12} />
              </Link>
            </Button>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <Editor />
      </DialogContent>
    </Dialog>
  );
};

export default HighlightCard;
