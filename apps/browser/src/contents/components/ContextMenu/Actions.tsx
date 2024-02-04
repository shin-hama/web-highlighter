import { useCallback, useMemo } from "react";
import {
  HashIcon,
  HighlighterIcon,
  MoreVerticalIcon,
  PaletteIcon,
  PowerIcon,
  PowerOffIcon,
  Trash2Icon,
} from "lucide-react";
import { useKeyPressEvent, useUnmount } from "react-use";

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

import { useHighlight } from "~/contents/hooks/useHighlight";
import { useLabels } from "~/contents/hooks/useLabels";
import type { MaybeHighlight } from "~/contents/types";
import { useIgnoredDomains } from "~/hooks/useIgnoredDomain";
import Labels from "./Labels";
import TagForm from "./TagForm";

interface Props {
  highlight: MaybeHighlight;
  onClose: () => void;
}
const Actions = ({ highlight, onClose }: Props) => {
  const [ignoredDomains, { toggle }] = useIgnoredDomains();
  const enabled = useMemo<boolean>(
    () => ignoredDomains.includes(window.location.hostname) === false,
    [ignoredDomains],
  );

  const [{ labelId, tags }, { save, remove, setLabel, addTag, removeTag }] =
    useHighlight(highlight);
  const labels = useLabels();

  useUnmount(save);

  const setDefaultHighlight = useCallback(() => {
    if (highlight !== null && "position" in highlight === false) {
      return;
    }

    if (labels.length > 0 && labels[0]) {
      setLabel(labels[0]);
    }
  }, [highlight, labels, setLabel]);

  const handleRemove = useCallback(async () => {
    await remove();
    onClose();
  }, [remove, onClose]);

  useKeyPressEvent(
    (e) =>
      e.altKey && e.code === "KeyC" && !e.shiftKey && !e.ctrlKey && !e.metaKey,
    setDefaultHighlight,
  );

  return (
    <div className="whl-rounded whl-bg-primary whl-px-2 whl-py-1 whl-text-primary-foreground">
      <div className="whl-flex whl-flex-row whl-gap-2">
        {!labelId ? (
          <TooltipProvider>
            <Tooltip delayDuration={400} defaultOpen={false}>
              <div className="whl-flex whl-flex-row whl-gap-2">
                <TooltipTrigger asChild>
                  <Button
                    size="icon_sm"
                    variant="ghost"
                    onClick={setDefaultHighlight}
                  >
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
                <Button size="icon_sm" variant="ghost">
                  <PaletteIcon size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                removePortal
                align="start"
                className="whl-w-auto whl-bg-primary whl-p-0"
              >
                <div className="whl-flex whl-flex-col whl-gap-0.5">
                  <Labels labels={labels} onChanged={setLabel} />
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon_sm" variant="ghost">
                  <HashIcon size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                removePortal
                align="start"
                className="whl-w-auto whl-bg-primary whl-p-0"
              >
                <div className="whl-flex whl-flex-col whl-gap-0.5">
                  <TagForm
                    tags={tags}
                    onTagAdded={addTag}
                    onTagRemoved={removeTag}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Button size="icon_sm" variant="ghost" onClick={handleRemove}>
              <Trash2Icon size={20} />
            </Button>
          </>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon_sm" variant="ghost">
              <MoreVerticalIcon size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            removePortal
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
