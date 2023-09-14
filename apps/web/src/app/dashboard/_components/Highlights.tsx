import type { Highlight as HighlightType } from "@whl/db";

import Highlight from "./Highlight";

interface Props {
  highlights: HighlightType[];
}
const Highlights = ({ highlights }: Props) => {
  return (
    <div className="whl-flex whl-flex-col whl-space-y-1">
      {highlights.map((item, index) => (
        <Highlight key={index} {...item} />
      ))}
    </div>
  );
};

export default Highlights;
