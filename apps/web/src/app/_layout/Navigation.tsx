"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, SettingsIcon } from "lucide-react";

import { Toggle } from "@whl/ui/components/ui/toggle";

const Navigation = () => {
  const path = usePathname();

  return (
    <div className="whl-flex whl-h-full whl-flex-col whl-justify-between">
      <div className="whl-flex whl-flex-col whl-space-y-1">
        <Toggle
          size="lg"
          pressed={path.startsWith("/dashboard")}
          className="whl-rounded-none data-[state=on]:whl-bg-primary-950 data-[state=on]:whl-text-primary-foreground"
          asChild
        >
          <Link href="/dashboard">
            <HomeIcon size={24} color="white" />
          </Link>
        </Toggle>
      </div>
      <div className="whl-flex whl-flex-col whl-space-y-1">
        <Toggle
          size="lg"
          pressed={path.startsWith("/settings")}
          className="whl-rounded-none data-[state=on]:whl-bg-primary-950 data-[state=on]:whl-text-primary-foreground"
          asChild
        >
          <Link href="/settings">
            <SettingsIcon size={24} color="white" />
          </Link>
        </Toggle>
      </div>
    </div>
  );
};

export default Navigation;
