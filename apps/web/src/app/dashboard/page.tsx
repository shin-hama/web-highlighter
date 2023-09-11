import type { FC } from "react";

import PageCard from "./_components/PageCard";

const pages = [
  { title: "test", highlights: ["test1", "test2"] },
  { title: "test2", highlights: ["test1", "test2"] },
  { title: "test3", highlights: ["test1", "test2"] },
  { title: "test3", highlights: ["test1", "test2"] },
];
const Dashboard: FC = () => {
  return (
    <div>
      {pages.map((page, index) => (
        <PageCard key={index} {...page} />
      ))}
    </div>
  );
};

export default Dashboard;
