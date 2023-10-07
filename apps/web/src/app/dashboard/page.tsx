import Filters from "./_components/Filters";
import PageList from "./_components/PageList";

const Dashboard = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const { labels } = searchParams;
  return (
    <div className="whl-flex whl-h-full whl-flex-col whl-overflow-hidden">
      <Filters
        filtered={{
          labels: typeof labels === "string" ? labels.split(",") : labels,
        }}
      />
      <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
        <PageList
          labels={typeof labels === "string" ? labels.split(",") : labels}
        />
      </div>
    </div>
  );
};

export default Dashboard;
