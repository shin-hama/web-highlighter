import type { HighlightWithLabel } from "@whl/common-types";

import Highlight from "./Highlight";

interface Props {
  highlights: HighlightWithLabel[];
}
const Highlights = ({ highlights }: Props) => {
  return (
    <div className="whl-flex whl-flex-col">
      {highlights.map((item, index) => (
        <Highlight key={index} {...item} />
      ))}
    </div>
  );
};

export default Highlights;
