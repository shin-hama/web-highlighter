import { useEffect, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { XIcon } from "lucide-react";

import { Badge } from "@whl/ui/components/ui/badge";
import { Input } from "@whl/ui/components/ui/input";

interface Props {
  tags: string[];
  onChangeTag: (tag: string) => void;
}
const TagForm = ({ tags, onChangeTag }: Props) => {
  const [value, setValue] = useState("");
  const handleSetTag = () => {
    if (tags.includes(value)) {
      // 同じタグが含まれていたら追加しない
      return;
    }
    onChangeTag(value);

    setValue("");
  };

  useEffect(() => {
    return () => {
      setValue("");
    };
  }, []);

  // TODO: タグが増えたら複数行に表示できるようにする
  return (
    <div className="whl-flex whl-flex-row whl-flex-wrap whl-gap-2">
      {tags.map((tag) => {
        return (
          <Badge key={tag} className="whl-items-center whl-gap-1 whl-text-xs">
            {tag}
            <Button variant="ghost" size="icon_xs">
              <XIcon size={12} />
            </Button>
          </Badge>
        );
      })}
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
          className="whl-w-52"
        />
      </form>
    </div>
  );
};

export default TagForm;
