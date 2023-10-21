import { useState } from "react";

import type { Label } from "@whl/db";
import { Input } from "@whl/ui/components/ui/input";

import LabelButton from "./LabelButton";

interface Props {
  label: Label;
}
const TagForm = ({ label }: Props) => {
  const [value, setValue] = useState("");
  const handleSetTag = () => {
    console.log(value);
  };

  return (
    <div className="whl-flex whl-w-60 whl-flex-row whl-gap-2">
      <LabelButton color={label?.color || "black"} />
      <Input
        type="text"
        placeholder="Add a tag"
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          setValue(e.target.value);
        }}
        // Enter 入力時にタグを確定する
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSetTag();
          }
        }}
        className="whl-h-full"
      />
    </div>
  );
};

export default TagForm;
