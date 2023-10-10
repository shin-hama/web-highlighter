import { List } from "lucide-react";

import { Button } from "@whl/ui/components/ui/button";
import { cn } from "@whl/ui/lib/utils";

import AccountMenu from "./AccountMenu";
import UserInfo from "./UserInfo";

const Sidebar = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "whl-h-full whl-bg-primary whl-pb-4 whl-pt-2 whl-text-primary-foreground",
        className,
      )}
    >
      <div className="whl-h-full">
        <div className="whl-flex whl-h-full whl-flex-col whl-space-y-6">
          <h1 className="whl-px-4 whl-font-mono whl-text-4xl whl-font-bold">
            Highlighter
          </h1>
          <div className="whl-flex whl-h-full whl-flex-col whl-justify-between">
            <div className="whl-flex whl-flex-col whl-space-y-1">
              <Button
                variant="ghost"
                className="whl-justify-start whl-rounded-none"
              >
                <List size={24} color="white" />
                Dashboard
              </Button>
            </div>
            <div className="whl-flex whl-flex-col whl-space-y-1">
              <AccountMenu>
                <Button
                  variant="ghost"
                  className="whl-justify-start whl-space-x-2 whl-rounded-none"
                >
                  <UserInfo />
                </Button>
              </AccountMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
