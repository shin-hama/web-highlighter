import { useMemo } from "react";
import {
  HighlighterIcon,
  MoreVerticalIcon,
  PowerIcon,
  PowerOffIcon,
} from "lucide-react";

import { Button } from "@whl/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@whl/ui/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@whl/ui/components/ui/tooltip";

import { useIgnoredDomains } from "~/hooks/useIgnoredDomain";

interface Props {
  handleHighlight: () => void;
}
const Actions = ({ handleHighlight }: Props) => {
  const [ignoredDomains, { toggle }] = useIgnoredDomains();

  const enabled = useMemo<boolean>(
    () => ignoredDomains.includes(window.location.hostname) === false,
    [ignoredDomains],
  );

  return (
    <div className="whl-rounded whl-bg-primary whl-px-2 whl-py-1">
      <Popover>
        <div className="whl-flex whl-flex-row whl-gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={400} defaultOpen={false}>
              <div className="whl-flex whl-flex-row whl-gap-2">
                <TooltipTrigger asChild>
                  <Button
                    size="icon_sm"
                    onClick={handleHighlight}
                  >
                    <HighlighterIcon size={20} />
                  </Button>
                </TooltipTrigger>
              </div>
              <TooltipContent side="bottom">
                <p className="whl-font-mono whl-text-xs">
                  Highlight Text (alt+c)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverTrigger asChild>
            <Button size="icon_sm">
              <MoreVerticalIcon size={20} />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent
          align="start"
          className="whl-w-auto whl-bg-primary whl-p-0"
        >
          <div className="whl-flex whl-flex-col whl-gap-0.5">
            <Button
              onClick={() => toggle(window.location.hostname)}
              className="whl-gap-1"
            >
              <span className="whl-text-primary-foreground">
                {enabled ? "Disable" : "Enable"} on {window.location.hostname}
              </span>
              {enabled ? <PowerOffIcon size={16} /> : <PowerIcon size={16} />}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Actions;
