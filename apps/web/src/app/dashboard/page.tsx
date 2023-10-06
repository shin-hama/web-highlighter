import Filters from "./_components/Filters";
import PageList from "./_components/PageList";

const Dashboard = () => {
  return (
    <div className="whl-flex whl-h-full whl-flex-col whl-overflow-hidden">
      <Filters />
      <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
        <PageList />
      </div>
    </div>
  );
};

export default Dashboard;
