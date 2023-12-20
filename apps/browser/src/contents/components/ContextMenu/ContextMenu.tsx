import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { HighlighterIcon, MoreVerticalIcon } from "lucide-react";

import type { TagDTO } from "@whl/common-types";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@whl/ui/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@whl/ui/components/ui/tooltip";

import { useHighlight } from "~/contents/hooks/useLabel";
import { useLabels } from "~/contents/hooks/useLabels";
import { usePopover } from "~/contents/hooks/usePopover";
import { useSession } from "~/hooks/useSession";
import Labels from "./Labels";
import ShortcutHighlight from "./ShortcutHighlight";
import TagForm from "./TagForm";

const ContextMenu = () => {
  const [highlight, { init, save, setLabel }] = useHighlight();
  const labels = useLabels();
  const { open, pos } = usePopover();
  const { status } = useSession();
  const [tags, setTags] = useState<TagDTO[]>([]);
  const anchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setTags([]);
      init();
    }
  }, [init, open]);

  const handleClose = useCallback(() => {
    setTags([]);
    save(tags);
  }, [save, tags]);

  const setDefaultHighlight = useCallback(() => {
    if (highlight !== null) {
      return;
    }

    if (labels.length > 0 && labels[0]) {
      setLabel(labels[0]);
    }
  }, [highlight, labels, setLabel]);

  const handleOpenMore = useCallback(() => {
    console.log("Open more");
  }, []);

  if (status !== "authenticated") {
    return <></>;
  }

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <PopoverAnchor asChild>
        <div
          ref={anchor}
          className={"whl-absolute whl-z-50"}
          // tailwind を使うと動的に位置を変更できなかったので、style で指定
          style={{
            left: pos.x,
            top: pos.y,
          }}
        />
      </PopoverAnchor>
      <PopoverContent
        className="whl-w-auto whl-max-w-xs whl-p-0"
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {highlight === null ? (
          <TooltipProvider>
            <Tooltip delayDuration={400}>
              <div className="whl-flex whl-flex-row whl-gap-2">
                <TooltipTrigger asChild>
                  <Button size="icon_sm" onClick={setDefaultHighlight}>
                    <HighlighterIcon size={24} />
                    Mark!
                  </Button>
                </TooltipTrigger>
                <Button size="icon_sm">
                  <MoreVerticalIcon size={24} onClick={handleOpenMore} />
                </Button>
              </div>
              <TooltipContent side="bottom">
                <p className="whl-font-mono whl-text-xs">
                  Highlight Text (alt+c)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="whl-flex whl-flex-col whl-gap-2 whl-p-2">
            <Labels labels={labels} onChanged={setLabel} />
            <TagForm tags={tags} onChangeTags={setTags} />
          </div>
        )}
      </PopoverContent>
      <ShortcutHighlight onExecute={setDefaultHighlight} />
    </Popover>
  );
};

export default ContextMenu;
