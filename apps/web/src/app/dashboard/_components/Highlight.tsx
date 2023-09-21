import type { HighlightWithLabel } from "~/types";

const Highlight = ({ label, content }: HighlightWithLabel) => {
  return (
    <div className="whl-flex whl-flex-row whl-items-stretch whl-space-x-2">
      <div className="whl-w-4" style={{ backgroundColor: label.color }}></div>
      <p className="whl-py-1">{content}</p>
    </div>
  );
};

export default Highlight;
