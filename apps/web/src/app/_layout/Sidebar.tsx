import Image from "next/image";
import { HomeIcon } from "lucide-react";

import { Button } from "@whl/ui/components/ui/button";
import { Toggle } from "@whl/ui/components/ui/toggle";
import { cn } from "@whl/ui/lib/utils";

import AccountMenu from "./AccountMenu";
import UserInfo from "./UserInfo";

const Sidebar = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "whl-bg-primary-900 whl-h-full whl-pb-4 whl-pt-2 whl-text-primary-foreground",
        className,
      )}
    >
      <div className="whl-h-full">
        <div className="whl-flex whl-h-full whl-flex-col whl-items-center whl-space-y-6">
          <Image src="/icon.svg" width={48} height={48} alt="Logo Image" />
          <div className="whl-flex whl-h-full whl-flex-col whl-justify-between">
            <div className="whl-flex whl-flex-col whl-space-y-1">
              <Toggle
                size="lg"
                pressed
                className="whl-rounded-none data-[state=on]:whl-bg-primary data-[state=on]:whl-text-primary-foreground"
              >
                <HomeIcon size={24} />
              </Toggle>
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
