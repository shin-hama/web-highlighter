import { getLabels } from "~/lib/labels";
import LabelFilter from "./LabelFilter";

const Filters = async () => {
  const labels = await getLabels();

  return (
    <div className="whl-flex whl-flex-row whl-items-center whl-gap-x-4 whl-px-4 whl-py-2">
      <div className="whl-font-bold">
        <p>FILTERS: </p>
      </div>
      <div className="whl-flex whl-flex-row whl-items-center whl-gap-2">
        <LabelFilter labels={labels} />
      </div>
    </div>
  );
};

export default Filters;
