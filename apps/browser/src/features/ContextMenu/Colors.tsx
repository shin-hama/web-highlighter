import { useState } from "react";
import { Toggle } from "@ui/components/ui/toggle";
import { COLORS, type Color } from "common-types";

const Colors = () => {
  const [selected, setSelected] = useState<Color>(COLORS[0]);
  return (
    <div className="whl-flex whl-flex-row whl-space-x-2">
      {COLORS.map((color) => {
        return (
          <Toggle
            pressed={selected === color}
            onPressedChange={() => setSelected(color)}
          >
            <div
              onClick={() => setSelected(color)}
              className={`whl-h-4 whl-w-4 whl-rounded-full whl-bg-${color}-400`}
            />
          </Toggle>
        );
      })}
    </div>
  );
};

export default Colors;
