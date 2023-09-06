import type { FC } from "react";

import { CircleIcon } from "@whl/ui/components/ui/icons";

interface Props {
  color: string;
  text: string;
}
const Highlight: FC<Props> = ({ color, text }) => {
  return (
    <div className="whl-flex whl-flex-row whl-space-x-2">
      <CircleIcon fill={color} />
      <p>{text}</p>
    </div>
  );
};

export default Highlight;
