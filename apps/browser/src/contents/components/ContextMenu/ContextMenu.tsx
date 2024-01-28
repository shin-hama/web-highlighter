import { useRef } from "react";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@whl/ui/components/ui/popover";

import { usePopover } from "~/contents/hooks/usePopover";
import { useSession } from "~/hooks/useSession";
import Actions from "./Actions";

const ContextMenu = () => {
  const { open, pos, highlight, close } = usePopover();
  const { status } = useSession();
  const anchor = useRef<HTMLDivElement>(null);

  if (status !== "authenticated") {
    return <></>;
  }

  return (
    <Popover open={open}>
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
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
        className="whl-w-auto whl-max-w-xs whl-p-0"
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {highlight && <Actions highlight={highlight} onClose={close} />}
      </PopoverContent>
    </Popover>
  );
};

export default ContextMenu;
