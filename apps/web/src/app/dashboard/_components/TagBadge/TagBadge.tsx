import { Button } from "@ui/components/ui/button";
import { HashIcon, XIcon } from "lucide-react";

import type { Tag } from "@whl/db";
import { Badge } from "@whl/ui/components/ui/badge";

const ICON_SIZE = 12;
interface Props {
  tag: Tag;
  removable?: boolean;
  /**
   * removable が true のときだけ有効
   * @returns
   */
  onRemove?: () => void;
}
const TagBadge = ({ tag, removable, onRemove }: Props) => {
  return (
    <Badge className="whl-gap-0.5 whl-text-xs">
      <HashIcon size={ICON_SIZE} />
      {tag.name}
      {removable && (
        <Button variant="ghost" size="icon_xs" onClick={onRemove}>
          <XIcon size={ICON_SIZE} />
        </Button>
      )}
    </Badge>
  );
};

export default TagBadge;
