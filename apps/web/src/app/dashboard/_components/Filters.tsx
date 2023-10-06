import { Palette } from "lucide-react";

import { getServerAuthSession } from "@whl/auth";
import { Button } from "@whl/ui/components/ui/Button";

import { getLabels } from "~/lib/labels";
import FilterPopover from "./FilterPopup";

const Filters = async () => {
  const session = await getServerAuthSession();

  if (session === null) {
    return <></>;
  }

  const labels = await getLabels(session.user.id);

  return (
    <div className="whl-flex whl-flex-row whl-items-center whl-gap-x-4 whl-px-4 whl-py-2">
      <div className="whl-font-bold">
        <p>FILTERS: </p>
      </div>
      <div className="whl-flex whl-flex-row whl-items-center whl-gap-2">
        <FilterPopover
          target="Label"
          items={labels.map((label) => label.color)}
        >
          <Button variant="ghost">
            <div className="whl-flex whl-flex-row whl-items-center whl-gap-1 whl-font-bold">
              <Palette />
              Color
            </div>
          </Button>
        </FilterPopover>
      </div>
    </div>
  );
};

export default Filters;
