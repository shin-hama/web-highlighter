import LabelFilter from "./LabelFilter";
import FilteredTags from "./TagFilter";

const Filters = () => {
  return (
    <div className="whl-flex whl-flex-row whl-items-center whl-gap-x-4 whl-px-4 whl-py-2">
      <div className="whl-font-bold">
        <p>FILTERS: </p>
      </div>
      <div className="whl-flex whl-flex-row whl-items-center whl-gap-2">
        <LabelFilter />
      </div>
      <FilteredTags />
    </div>
  );
};

export default Filters;
