import { useEffect, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { XIcon } from "lucide-react";

import type { TagDTO } from "@whl/common-types";
import { Badge } from "@whl/ui/components/ui/badge";
import { Input } from "@whl/ui/components/ui/input";

interface Props {
  tags: TagDTO[];
  onChangeTags: (tags: TagDTO[]) => void;
}
const TagForm = ({ tags, onChangeTags }: Props) => {
  const [value, setValue] = useState("");
  const handleSetTag = () => {
    if (tags.some((tag) => tag.name === value)) {
      // 同じタグが含まれていたら追加しない
      return;
    }
    onChangeTags([...tags, { name: value }]);

    setValue("");
  };

  const handleRemoveTag = (tag: TagDTO) => {
    onChangeTags(tags.filter((t) => t.name === tag.name));
  };

  useEffect(() => {
    return () => {
      setValue("");
    };
  }, []);

  // TODO: タグが増えたら複数行に表示できるようにする
  return (
    <div className="whl-flex whl-flex-col whl-gap-2">
      {tags?.length > 0 && (
        <div className="whl-flex whl-flex-row whl-flex-wrap whl-gap-1">
          {tags.map((tag) => {
            return (
              <Badge
                key={tag.id ?? tag.name}
                className="whl-items-center whl-gap-1 whl-text-xs"
              >
                {tag.name}
                <Button
                  variant="ghost"
                  size="icon_xs"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <XIcon size={12} />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSetTag();
          return false;
        }}
      >
        <Input
          type="text"
          placeholder="Enter tag"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TagForm;
