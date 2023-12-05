import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { HighlighterIcon } from "lucide-react";

import type { TagDTO } from "@whl/common-types";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@whl/ui/components/ui/popover";

import { useHighlight } from "~/contents/hooks/useLabel";
import { usePopover } from "~/contents/hooks/usePopover";
import { useSession } from "~/hooks/useSession";
import Labels from "./Labels";
import TagForm from "./TagForm";

const ContextMenu = () => {
  const [highlight, { init, save, setLabel }] = useHighlight();
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
          <Button size="icon_sm">
            <HighlighterIcon size={24} />
          </Button>
        ) : (
          <div className="whl-flex whl-flex-col whl-gap-2 whl-p-2">
            <Labels onChanged={setLabel} />
            <TagForm tags={tags} onChangeTags={setTags} />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ContextMenu;
