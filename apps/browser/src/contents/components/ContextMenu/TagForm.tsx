import { useEffect, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { XIcon } from "lucide-react";
import { useList } from "react-use";

import type { Label } from "@whl/db";
import { Badge } from "@whl/ui/components/ui/badge";
import { Input } from "@whl/ui/components/ui/input";

import LabelButton from "./LabelButton";

interface Props {
  label: Label;
}
const TagForm = ({ label }: Props) => {
  const [value, setValue] = useState("");
  const [tags, tagsAction] = useList<string>([]);
  const handleSetTag = () => {
    tagsAction.push(value);
    setValue("");
  };

  useEffect(() => {
    return () => {
      tagsAction.clear();
      setValue("");
    };
  }, [tagsAction]);

  return (
    <div className="whl-flex whl-w-60 whl-flex-row whl-gap-2">
      <LabelButton color={label?.color || "black"} />
      {tags.map((tag) => {
        return (
          <Badge
            key={tag}
            className="whl-gbftext-xs whl-items-center whl-gap-1"
          >
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
          placeholder="Add a tag"
          value={value}
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default TagForm;
