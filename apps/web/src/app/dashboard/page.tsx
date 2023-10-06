import Filters from "./_components/Filters";
import PageList from "./_components/PageList";

const Dashboard = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  console.log(searchParams);
  const { labels } = searchParams;
  return (
    <div className="whl-flex whl-h-full whl-flex-col whl-overflow-hidden">
      <Filters />
      <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
        <PageList
          labels={typeof labels === "string" ? labels.split(",") : labels}
        />
      </div>
    </div>
  );
};

export default Dashboard;
