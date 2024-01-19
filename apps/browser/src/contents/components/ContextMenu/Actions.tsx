import { useCallback, useMemo, useState } from "react";
import {
  HashIcon,
  HighlighterIcon,
  MoreVerticalIcon,
  PaletteIcon,
  PowerIcon,
  PowerOffIcon,
  Trash2Icon,
} from "lucide-react";

import type { TagDTO } from "@whl/common-types";
import { Button } from "@whl/ui/components/ui/button";
import {
  Popover,
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
import type { MaybeHighlight } from "~/contents/types";
import { useIgnoredDomains } from "~/hooks/useIgnoredDomain";
import Labels from "./Labels";
import ShortcutHighlight from "./ShortcutHighlight";
import TagForm from "./TagForm";

interface Props {
  highlight: MaybeHighlight;
}
const Actions = ({ highlight }: Props) => {
  const [ignoredDomains, { toggle }] = useIgnoredDomains();
  const enabled = useMemo<boolean>(
    () => ignoredDomains.includes(window.location.hostname) === false,
    [ignoredDomains],
  );
  const [tags, setTags] = useState<TagDTO[]>([]);
  const { save, setLabel } = useHighlight(highlight);
  const labels = useLabels();

  const handleCloseTagForm = useCallback(
    (open: boolean) => {
      if (!open) {
        setTags([]);
        save(tags);
      }
    },
    [save, tags],
  );

  const setDefaultHighlight = useCallback(() => {
    if (highlight !== null && "position" in highlight === false) {
      return;
    }

    if (labels.length > 0 && labels[0]) {
      setLabel(labels[0]);
    }
  }, [highlight, labels, setLabel]);

  return (
    <div className="whl-rounded whl-bg-primary whl-px-2 whl-py-1">
      <ShortcutHighlight onExecute={setDefaultHighlight} />
      <div className="whl-flex whl-flex-row whl-gap-2">
        {!highlight.id ? (
          <TooltipProvider>
            <Tooltip delayDuration={400} defaultOpen={false}>
              <div className="whl-flex whl-flex-row whl-gap-2">
                <TooltipTrigger asChild>
                  <Button size="icon_sm" onClick={setDefaultHighlight}>
                    <HighlighterIcon size={20} />
                  </Button>
                </TooltipTrigger>
              </div>
              <TooltipContent side="bottom">
                <p className="whl-font-mono whl-text-xs">
                  Highlight Text (alt+c)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon_sm">
                  <PaletteIcon size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="whl-w-auto whl-bg-primary whl-p-0"
              >
                <div className="whl-flex whl-flex-col whl-gap-0.5">
                  <Labels labels={labels} onChanged={setLabel} />
                </div>
              </PopoverContent>
            </Popover>
            <Popover onOpenChange={handleCloseTagForm}>
              <PopoverTrigger asChild>
                <Button size="icon_sm">
                  <HashIcon size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="whl-w-auto whl-bg-primary whl-p-0"
              >
                <div className="whl-flex whl-flex-col whl-gap-0.5">
                  <TagForm tags={tags} onChangeTags={setTags} />
                </div>
              </PopoverContent>
            </Popover>
            <Button size="icon_sm">
              <Trash2Icon size={20} />
            </Button>
          </>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon_sm">
              <MoreVerticalIcon size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="whl-w-auto whl-bg-primary whl-p-0"
          >
            <div className="whl-flex whl-flex-col whl-gap-0.5">
              <Button
                onClick={() => toggle(window.location.hostname)}
                className="whl-gap-1"
              >
                <span className="whl-text-primary-foreground">
                  {enabled ? "Disable" : "Enable"} on {window.location.hostname}
                </span>
                {enabled ? <PowerOffIcon size={16} /> : <PowerIcon size={16} />}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Actions;
