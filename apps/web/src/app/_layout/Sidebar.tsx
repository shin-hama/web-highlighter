import Image from "next/image";

import { Button } from "@whl/ui/components/ui/button";
import { cn } from "@whl/ui/lib/utils";

import AccountMenu from "./AccountMenu";
import Navigation from "./Navigation";
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
        <div className="whl-flex whl-h-full whl-flex-col whl-items-center whl-space-y-6">
          <Image src="/icon.svg" width={48} height={48} alt="Logo Image" />
          <div className="whl-flex whl-h-full whl-flex-col whl-space-y-2">
            <Navigation />
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
