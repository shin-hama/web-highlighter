import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/components/ui/collapsible";
import { Label } from "@ui/components/ui/label";
import { Switch } from "@ui/components/ui/switch";
import { HighlighterIcon, MoreVerticalIcon } from "lucide-react";

import type { TagDTO } from "@whl/common-types";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@whl/ui/components/ui/popover";

import { useHighlight } from "~/contents/hooks/useLabel";
import { useLabels } from "~/contents/hooks/useLabels";
import { usePopover } from "~/contents/hooks/usePopover";
import { useIgnoredDomains } from "~/hooks/useIgnoredDomain";
import { useSession } from "~/hooks/useSession";
import Labels from "./Labels";
import TagForm from "./TagForm";

const ContextMenu = () => {
  const [highlight, { init, save, setLabel }] = useHighlight();
  const labels = useLabels();
  const { open, pos } = usePopover();
  const { status } = useSession();
  const [tags, setTags] = useState<TagDTO[]>([]);
  const anchor = useRef<HTMLDivElement>(null);
  const [_, { add, remove }] = useIgnoredDomains();

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
    if (labels.length > 0 && labels[0]) {
      setLabel(labels[0]);
    }
  }, [labels, setLabel]);

  const handleToggleIgnored = useCallback(
    (checked: boolean) => {
      if (checked) {
        add(window.location.hostname).then(console.log).catch(console.error);
      } else {
        remove(window.location.hostname).then(console.log).catch(console.error);
      }
    },
    [add, remove],
  );

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
          <div className="space-y-2">
            <Collapsible>
              <div className="whl-flex whl-flex-row whl-gap-2">
                <Button size="icon_sm" onClick={setDefaultHighlight}>
                  <HighlighterIcon size={24} />
                  Mark!
                </Button>
                <CollapsibleTrigger asChild>
                  <Button size="icon_sm">
                    <MoreVerticalIcon size={24} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enabled-on"
                    defaultChecked={true}
                    onCheckedChange={handleToggleIgnored}
                  />
                  <Label htmlFor="enabled-on">
                    Enable on {window.location.hostname}
                  </Label>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ) : (
          <div className="whl-flex whl-flex-col whl-gap-2 whl-p-2">
            <Labels labels={labels} onChanged={setLabel} />
            <TagForm tags={tags} onChangeTags={setTags} />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ContextMenu;
