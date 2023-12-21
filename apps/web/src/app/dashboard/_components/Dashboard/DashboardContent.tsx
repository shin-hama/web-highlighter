"use client";

import { XIcon } from "lucide-react";

import { Button } from "@whl/ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@whl/ui/components/ui/collapsible";

import {
  useHighlightDetail,
  useSetHighlightDetail,
} from "../../_context/HighlightDetailContext";
import HighlightsGroupBy from "../Highlights";

const DashboardContent = () => {
  const highlightId = useHighlightDetail();
  const setHighlightId = useSetHighlightDetail();

  return (
    <Collapsible
      open={!!highlightId}
      defaultOpen={false}
      className="whl-flex whl-h-full whl-flex-1 whl-flex-row whl-overflow-hidden"
    >
      <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
        <HighlightsGroupBy />
      </div>
      <CollapsibleContent className="whl-inset-y-0 whl-right-0 whl-h-full whl-w-3/4 whl-flex-1 whl-border-l data-[state=closed]:whl-duration-100 data-[state=open]:whl-duration-200 data-[state=open]:whl-animate-in data-[state=closed]:whl-animate-out data-[state=closed]:whl-slide-out-to-right data-[state=open]:whl-slide-in-from-right">
        <Button size="icon" onClick={() => setHighlightId(null)}>
          <XIcon />
        </Button>
        <h2>test</h2>
        <p>{highlightId}</p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DashboardContent;
