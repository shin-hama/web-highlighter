"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardCopyIcon,
  ExternalLink,
  MoreVerticalIcon,
  Trash2,
} from "lucide-react";
import { useSWRConfig } from "swr";

import { Button } from "@whl/ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@whl/ui/components/ui/tooltip";

const ActionIconSize = 20;
interface Props {
  id: string;
  pageId: string;
  url: string;
}
export const Actions = ({ id, url }: Props) => {
  const { mutate } = useSWRConfig();
  const handleRemove = async () => {
    await fetch(`/api/highlights/${id}`, {
      method: "DELETE",
    });

    void mutate(
      (key) => typeof key === "string" && key.startsWith("/api/highlights?"),
    );
  };

  const [clipboardTooltip, setClipboardTooltip] = useState("Copy to clipboard");
  const [openClipboardTooltip, setOpenClipboardTooltip] = useState(false);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="whl-flex whl-border-spacing-2 whl-flex-row">
        {url && (
          <>
            <Tooltip
              open={openClipboardTooltip}
              onOpenChange={(open) => {
                setOpenClipboardTooltip(open);
                if (open) {
                  setClipboardTooltip("Copy link to highlight");
                }
              }}
            >
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon_sm"
                  onClick={async () => {
                    await navigator.clipboard.writeText(url);
                    setClipboardTooltip("Copied!");
                    setOpenClipboardTooltip(true);
                  }}
                >
                  <ClipboardCopyIcon size={ActionIconSize} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="whl-text-xs">
                {clipboardTooltip}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon_sm" asChild>
                  <Link href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={ActionIconSize} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="whl-text-xs">
                Open highlight text
              </TooltipContent>
            </Tooltip>
          </>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon_sm" variant="ghost" onClick={handleRemove}>
              <Trash2 size={ActionIconSize} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="whl-text-xs">Remove</TooltipContent>
        </Tooltip>
        <Button size="icon_sm" variant="ghost" onClick={handleRemove}>
          <MoreVerticalIcon size={ActionIconSize} />
        </Button>
      </div>
    </TooltipProvider>
  );
};
