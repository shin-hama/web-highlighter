import Filters from "./_components/Filters";
import HighlightsGroupBy from "./_components/Highlights/HighlightsGroupBy";

const Dashboard = () => {
  return (
    <div className="whl-flex whl-h-full whl-flex-1 whl-flex-col whl-overflow-hidden">
      <Filters />
      <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
        <HighlightsGroupBy />
      </div>
    </div>
  );
};

export default Dashboard;
