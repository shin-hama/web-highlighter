import { Button } from "@whl/ui/components/ui/Button";
import { cn } from "@whl/ui/lib/utils";

const Sidebar = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("whl-pb-12", className)}>
      <div className="whl-px-3 whl-py-2">
        <div className="whl-flex whl-flex-col whl-space-y-2">
          <h1 className="whl-font-mono whl-text-2xl whl-font-bold">
            <span className="whl-bg-red-300 whl-p-0.5">High</span>lighter
          </h1>
          <h2 className="whl-mb-2 whl-px-4 whl-text-lg whl-font-semibold whl-tracking-tight">
            Discover
          </h2>
          <div className="whl-flex whl-flex-col whl-space-y-1">
            <Button variant="secondary" className="whl-justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="whl-mr-2 whl-h-4 whl-w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Listen Now
            </Button>
            <Button variant="ghost" className="whl-justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="whl-mr-2 whl-h-4 whl-w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              Browse
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
