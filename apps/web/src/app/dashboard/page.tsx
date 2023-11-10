import { DashboardQuerySchema } from "~/types/query";
import Filters from "./_components/Filters";
import PageList from "./_components/PageList";

const Dashboard = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const { labels } = DashboardQuerySchema.parse(searchParams);
  return (
    <div className="whl-flex whl-h-full whl-flex-1 whl-flex-col whl-overflow-hidden">
      <Filters
        filtered={{
          labels,
        }}
      />
      <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
        <PageList labels={labels} />
      </div>
    </div>
  );
};

export default Dashboard;
