import { ScrollArea } from "@ui/components/ui/scroll-area";

import type { GroupingType } from "~/types";
import { GROUPING_TYPE } from "~/types";
import PageList from "./PageGroup/PageList";
import TagGroup from "./TagGroup/TagGroup";

interface Props {
  labels?: string[];
  grouped?: GroupingType;
}
const HighlightsGroupBy = ({ labels, grouped }: Props) => {
  return (
    <ScrollArea className="whl-box-border whl-h-full whl-w-full">
      {grouped === GROUPING_TYPE.page ? (
        <PageList labels={labels} />
      ) : (
        <TagGroup />
      )}
    </ScrollArea>
  );
};

export default HighlightsGroupBy;
