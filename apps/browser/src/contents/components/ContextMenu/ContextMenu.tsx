import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  HighlighterIcon,
  MoreVerticalIcon,
  PowerIcon,
  PowerOffIcon,
} from "lucide-react";

import type { TagDTO } from "@whl/common-types";
import { Button } from "@whl/ui/components/ui/button";
import { Label } from "@whl/ui/components/ui/label";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
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
import { useIgnoredDomains } from "~/hooks/useIgnoredDomain";
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
  const [ignoredDomains, { toggle }] = useIgnoredDomains();

  const enabled = useMemo<boolean>(
    () => ignoredDomains.includes(window.location.hostname) === false,
    [ignoredDomains],
  );

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
          <Popover>
            <div className="whl-rounded whl-bg-primary whl-px-2 whl-py-1">
              <div className="whl-flex whl-flex-row whl-gap-2">
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
                <Button size="icon_sm" onClick={setDefaultHighlight}>
                  <HighlighterIcon size={20} />
                </Button>
                <PopoverTrigger asChild>
                  <Button size="icon_sm">
                    <MoreVerticalIcon size={20} />
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent
                align="start"
                className="whl-w-auto whl-bg-primary whl-p-0"
              >
                <div className="whl-flex whl-flex-col whl-gap-0.5">
                  <Button
                    onClick={() => toggle(window.location.hostname)}
                    className="whl-gap-1"
                  >
                    <Label
                      htmlFor="enabled-on"
                      className="whl-text-primary-foreground"
                    >
                      {enabled ? "Disable" : "Enable"} on{" "}
                      {window.location.hostname}
                    </Label>
                    {enabled ? (
                      <PowerOffIcon size={20} />
                    ) : (
                      <PowerIcon size={20} />
                    )}
                  </Button>
                </div>
              </PopoverContent>
            </div>
          </Popover>
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
