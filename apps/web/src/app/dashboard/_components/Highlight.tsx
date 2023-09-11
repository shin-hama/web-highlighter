import type { FC } from "react";

import { CircleIcon } from "@whl/ui/components/ui/icons";

interface Props {
  color: string;
  text: string;
}
const Highlight: FC<Props> = ({ color, text }) => {
  return (
    <div className="whl-flex whl-flex-row whl-items-center whl-space-x-2 whl-pl-6">
      <CircleIcon color={color} />
      <p>{text}</p>
    </div>
  );
};

export default Highlight;
