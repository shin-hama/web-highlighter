import Filters from "./_components/Filters";
import PageList from "./_components/PageList";

const Dashboard = () => {
  return (
    <div className="whl-h-full">
      <Filters />
      <PageList />
    </div>
  );
};

export default Dashboard;
