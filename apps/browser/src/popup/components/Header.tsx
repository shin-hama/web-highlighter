import { useCallback, useEffect, useMemo, useState } from "react";
import { PowerIcon, PowerOffIcon } from "lucide-react";

import { Button } from "@whl/ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@whl/ui/components/ui/tooltip";

import { useIgnoredDomains } from "~/hooks/useIgnoredDomain";
import { APP_HOST } from "~/lib/config";

const Header = () => {
  const [url, setUrl] = useState<URL>();
  const [ignored, { add, remove }] = useIgnoredDomains();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab) {
        setUrl(new URL(tab.url ?? ""));
      }
    });
  }, []);

  const enabled = useMemo<boolean>(() => {
    if (url) {
      return ignored.includes(url.hostname) === false;
    }

    return false;
  }, [ignored, url]);

  const handleToggle = useCallback(async () => {
    if (!url) {
      return;
    }
    if (enabled) {
      await add(url.hostname);
    } else {
      await remove(url.hostname);
    }
  }, [add, enabled, remove, url]);

  return (
    <div className="whl-flex whl-w-full whl-flex-row whl-justify-between whl-bg-primary-950 whl-px-4 whl-py-2 whl-text-primary-foreground">
      <a
        href={`${APP_HOST}/dashboard`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1 className="whl-font-mono whl-text-4xl whl-font-bold">
          Highlighter
        </h1>
      </a>
      <TooltipProvider>
        <Tooltip delayDuration={400}>
          <TooltipTrigger asChild>
            <Button size="icon" onClick={handleToggle}>
              {enabled ? <PowerIcon size={20} /> : <PowerOffIcon size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="whl-font-mono whl-text-xs">
              {enabled ? "Disable" : "Enable"} extension on {url?.hostname}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Header;
