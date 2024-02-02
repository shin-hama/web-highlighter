import { HashIcon, XIcon } from "lucide-react";

import type { Tag } from "@whl/db";
import { Badge } from "@whl/ui/components/ui/badge";
import { Button } from "@whl/ui/components/ui/button";

interface Props {
  tag: Tag;
  onRemoved: (tagId: string) => void;
}
const TagBadge = ({ tag, onRemoved }: Props) => (
  <Badge className="whl-group/tag whl-relative whl-gap-0.5">
    <HashIcon size={12} className="whl-visible group-hover/tag:whl-hidden" />
    {tag.name}
    <Button
      variant="ghost"
      size="icon"
      className="whl-hidden whl-h-3 whl-w-3 group-hover/tag:whl-block"
      onClick={(e) => {
        e.stopPropagation();
        onRemoved(tag.id);
      }}
    >
      <XIcon size={12} />
    </Button>
  </Badge>
);

export default TagBadge;
