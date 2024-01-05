import { ScrollArea } from "@whl/ui/components/ui/scroll-area";

import Filters from "./_components/Filters";
import HighlightGallery from "./_components/Gallery/Gallery";

const Dashboard = () => {
  return (
    <div className="whl-flex whl-h-full whl-flex-1 whl-flex-col whl-overflow-hidden">
      <Filters />
      <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
        <ScrollArea className="whl-box-border whl-h-full whl-w-full">
          <HighlightGallery />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Dashboard;
