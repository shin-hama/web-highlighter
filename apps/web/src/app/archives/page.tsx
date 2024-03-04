import { ScrollArea } from "@whl/ui/components/ui/scroll-area";

import ArchivedGallery from "./_components/ArchivedGallery";

const Dashboard = () => {
  return (
    <div className="whl-flex whl-h-full whl-flex-1 whl-flex-col whl-overflow-hidden">
      <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
        <ScrollArea className="whl-box-border whl-h-full whl-w-full">
          <ArchivedGallery />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Dashboard;
