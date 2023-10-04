import { Palette } from "lucide-react";

import { Button } from "@whl/ui/components/ui/Button";

import FilterPopover from "./FilterPopup";

const Filters = () => {
  return (
    <div className="whl-flex whl-flex-row whl-space-x-4">
      <div className="whl-p-2">
        <p>Filters: </p>
      </div>
      <div className="whl-flex whl-flex-row">
        <FilterPopover
          target="Label"
          items={["label1", "label2", "label3", "label4"]}
        >
          <Button variant="ghost">
            <Palette />
            Color
          </Button>
        </FilterPopover>
      </div>
    </div>
  );
};

export default Filters;
