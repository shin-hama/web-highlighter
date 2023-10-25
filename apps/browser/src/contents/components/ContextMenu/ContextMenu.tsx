import { useCallback, useEffect } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useList } from "react-use";

import type { CreateHighlightRequest } from "@whl/common-types";
import { Card } from "@whl/ui/components/ui/card";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@whl/ui/components/ui/popover";

import { useHighlight } from "~/contents/hooks/useLabel";
import { usePopover } from "~/contents/hooks/usePopover";
import { useSession } from "~/hooks/useSession";
import LabelButton from "./LabelButton";
import Labels from "./Labels";
import TagForm from "./TagForm";

const ContextMenu = () => {
  const [highlight, { setLabel, removeHighlight }] = useHighlight();
  const { open, pos } = usePopover();
  const { status } = useSession();
  const [tags, tagsAction] = useList<string>([]);

  useEffect(() => {
    return () => {
      tagsAction.clear();
    };
  }, [tagsAction]);

  const handleClose = useCallback(async () => {
    // Label と Tag を作成する
    if (!highlight) {
      return;
    }
    try {
      const result = await sendToBackground<CreateHighlightRequest>({
        name: "highlight/save",
        body: {
          page: {
            // build url removed query and fragment
            url: window.location.origin + window.location.pathname,
            title: document.title,
          },
          highlight: {
            content: highlight.content,
            labelId: highlight.label.id,
          },
          tags: tags.map((tag) => ({ name: tag })),
        },
      });
      if (!result) {
        removeHighlight();
      }
    } catch {
      // ハイライトを削除する
      removeHighlight();
    }
  }, [highlight, removeHighlight, tags]);

  if (status !== "authenticated" || !open) {
    return <></>;
  }

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          handleClose;
        }
      }}
    >
      <PopoverAnchor>
        <div
          className={"whl-absolute whl-z-50"}
          // tailwind を使うと動的に位置を変更できなかったので、style で指定
          style={{
            left: pos.x,
            top: pos.y,
          }}
        />
      </PopoverAnchor>
      <PopoverContent>
        <Card
          onMouseUp={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="whl-p-2">
            {highlight ? (
              <div className="whl-flex whl-w-60 whl-flex-row whl-flex-wrap whl-gap-2">
                <LabelButton color={highlight.label.color} />
                <TagForm tags={tags} onChangeTag={tagsAction.push} />
              </div>
            ) : (
              <Labels onChanged={setLabel} />
            )}
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default ContextMenu;
