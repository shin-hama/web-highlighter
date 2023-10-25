import { Card } from "@whl/ui/components/ui/card";

import { useLabel } from "~/contents/hooks/useLabel";
import { usePopup } from "~/contents/hooks/usePopup";
import { useSession } from "~/hooks/useSession";
import Labels from "./Labels";
import TagForm from "./TagForm";

const ContextMenu = () => {
  const [label, setLabel] = useLabel();
  const { open, pos } = usePopup();
  const { status } = useSession();

  if (status !== "authenticated") {
    return <></>;
  }

  if (!open) {
    return <></>;
  }

  return (
    <div
      className={"whl-absolute whl-z-50"}
      // tailwind を使うと動的に位置を変更できなかったので、style で指定
      style={{
        left: pos.x,
        top: pos.y,
      }}
    >
      <Card
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="whl-p-2">
          {!label ? <TagForm label={label} /> : <Labels onChanged={setLabel} />}
        </div>
      </Card>
    </div>
  );
};

export default ContextMenu;
