import { PlusIcon } from "lucide-react";

import type { HighlightWithLabelAndTag } from "@whl/common-types";
import { Input } from "@whl/ui/components/ui/input";

import TagBadge from "~/app/dashboard/_components/TagBadge";

const EditableHighlight = ({
  label,
  content,
  HighlightOnTag,
}: HighlightWithLabelAndTag) => {
  return (
    <div className="whl-flex whl-flex-grow whl-flex-col whl-items-start whl-gap-2 whl-py-2">
      <div className="whl-group/highlight whl-relative whl-flex whl-flex-row whl-items-stretch whl-gap-x-2 ">
        <div
          className="whl-w-2 whl-flex-shrink-0"
          style={{ backgroundColor: label.color }}
        ></div>
        <span className="">{content}</span>
      </div>
      <div className="whl-flex whl-flex-row whl-flex-wrap whl-items-center whl-gap-1">
        {HighlightOnTag.map(({ tag }) => (
          <TagBadge key={tag.id} tag={tag} />
        ))}
        <Input
          type="text"
          placeholder="Add tag"
          icon={<PlusIcon size={16} />}
          className="whl-h-6 whl-text-xs"
        />
      </div>
    </div>
  );
};

export default EditableHighlight;
