import { useEffect, useState } from "react";

import type { Label } from "@whl/db";

import LabelButton from "./LabelButton";

interface Props {
  labels: Label[];
  onChanged: (label: Label) => void;
}
const Labels = ({ labels, onChanged }: Props) => {
  const [selected, setSelected] = useState<Label>();

  useEffect(() => {
    if (selected) {
      onChanged(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className="whl-flex whl-flex-row whl-space-x-1">
      {labels.map((label) => {
        return (
          <LabelButton
            key={label.id}
            color={label.color}
            pressed={selected === label}
            onPressedChange={() => {
              setSelected(label);
            }}
            className="whl-h-auto whl-rounded-full whl-p-1"
          />
        );
      })}
    </div>
  );
};

export default Labels;
