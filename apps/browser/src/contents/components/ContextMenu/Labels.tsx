import { useEffect, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce } from "react-use";

import type { Label } from "@whl/db";
import { Toggle } from "@whl/ui/components/ui/toggle";

interface Props {
  onChanged: (label: Label) => void;
}
const Labels = ({ onChanged }: Props) => {
  const [selected, setSelected] = useState<Label>();
  const [labels, setLabels] = useState<Label[]>([]);

  useEffectOnce(() => {
    sendToBackground<undefined, Label[]>({
      name: "labels/list",
    })
      .then((response) => {
        setLabels(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

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
          <Toggle
            key={label.id}
            pressed={selected === label}
            onPressedChange={() => {
              setSelected(label);
            }}
            className="whl-h-auto whl-rounded-full whl-p-1"
          >
            <div
              className={`whl-h-5 whl-w-5 whl-rounded-full`}
              style={{ backgroundColor: label.color }}
            />
          </Toggle>
        );
      })}
    </div>
  );
};

export default Labels;
