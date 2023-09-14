import type { Highlight as HighlightType } from "@whl/db";
import { CircleIcon } from "@whl/ui/components/ui/icons";

const Highlight = ({ color, content }: HighlightType) => {
  return (
    <div className="whl-flex whl-flex-row whl-items-center whl-space-x-2 whl-pl-6">
      <CircleIcon color={color} />
      <p>{content}</p>
    </div>
  );
};

export default Highlight;
