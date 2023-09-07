import { useState } from "react";

import { COLORS } from "@whl/common-types";
import type { Color } from "@whl/common-types";
import { Toggle } from "@whl/ui/components/ui/toggle";

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
              className={`whl-h-4 whl-w-4 whl-rounded-full`}
              style={{ backgroundColor: color }}
            />
          </Toggle>
        );
      })}
    </div>
  );
};

export default Colors;
