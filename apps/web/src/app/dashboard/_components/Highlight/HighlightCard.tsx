import { Skeleton } from "@ui/components/ui/skeleton";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@whl/ui/components/ui/card";

import { Actions } from "./Actions";
import EditorDialog from "./Editor";
import HighlightContent from "./HighlightContent";
import { useHighlight } from "./hooks/useHighlight";
import QuoteSource from "./ReferencedFooter";
import TagBadge from "./TagBadge";

const HighlightCard = (props: HighlightWithLabelAndPageAndTag) => {
  const {
    highlight,
    isLoading,
    removeTag: handleRemoveTag,
  } = useHighlight(props.id, props);

  if (!highlight && isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="whl-h-16" />
        </CardHeader>
      </Card>
    );
  }

  if (!highlight) {
    return <></>;
  }

  return (
    <EditorDialog highlight={highlight}>
      <Card
        id={`highlight-card-${highlight.id}`}
        className="whl-group/highlight whl-cursor-pointer"
        style={{
          backgroundColor: highlight.label.color,
        }}
      >
        <CardHeader>
          <HighlightContent content={highlight.content} />
        </CardHeader>
        {highlight.HighlightOnTag.length > 0 && (
          <CardContent>
            <div className="whl-flex whl-flex-row whl-flex-wrap whl-items-center whl-gap-1">
              {highlight.HighlightOnTag.map(({ tag }) => (
                <TagBadge key={tag.id} tag={tag} onRemoved={handleRemoveTag} />
              ))}
            </div>
          </CardContent>
        )}
        <CardFooter>
          <div className="whl-invisible group-hover/highlight:whl-visible">
            <Actions {...highlight} />
          </div>
        </CardFooter>
        <QuoteSource {...highlight.page} />
      </Card>
    </EditorDialog>
  );
};

export default HighlightCard;
