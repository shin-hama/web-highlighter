import { DashboardContent } from "./_components/Dashboard";
import Filters from "./_components/Filters";

const Dashboard = () => {
  return (
    <div className="whl-flex whl-h-full whl-flex-1 whl-flex-col whl-overflow-hidden">
      <Filters />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
