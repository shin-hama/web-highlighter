import { useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce } from "react-use";

import type { Label } from "@whl/db";

export const useLabels = () => {
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

  return labels;
};
