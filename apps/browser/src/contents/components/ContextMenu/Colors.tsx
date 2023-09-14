import { useEffect, useState } from "react";

import { COLORS } from "@whl/common-types";
import type { Color } from "@whl/common-types";
import { Toggle } from "@whl/ui/components/ui/toggle";

interface Props {
  onChanged: (color: Color) => void;
}
const Colors = ({ onChanged }: Props) => {
  const [selected, setSelected] = useState<Color>();

  useEffect(() => {
    console.log(selected);
    if (selected) {
      onChanged(selected);
    }
  }, [selected]);

  return (
    <div className="whl-flex whl-flex-row whl-space-x-1">
      {COLORS.map((color) => {
        return (
          <Toggle
            key={color}
            pressed={selected === color}
            onPressedChange={() => setSelected(color)}
            className="whl-h-auto whl-rounded-full whl-p-1"
          >
            <div
              onClick={() => setSelected(color)}
              className={`whl-h-5 whl-w-5 whl-rounded-full`}
              style={{ backgroundColor: color }}
            />
          </Toggle>
        );
      })}
    </div>
  );
};

export default Colors;
