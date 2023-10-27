import { SearchIcon } from "lucide-react";

import { Input } from "@whl/ui/components/ui/input";
import { Toggle } from "@whl/ui/components/ui/toggle";

// test data of tag list
const tags = [
  "test",
  "test",
  "test",
  "test",
  "test",
  "test",
  "test",
  "test",
  "test",
  "test",
];

const TagExplore = () => {
  return (
    <div className="whl-h-full whl-w-48 whl-bg-primary whl-px-4 whl-pb-4 whl-pt-2 whl-text-primary-foreground">
      <div className="whl-h-full">
        <div className="whl-flex whl-h-full whl-flex-col whl-items-center whl-space-y-6">
          <h1 className="whl-px-4 whl-font-mono whl-text-2xl whl-font-bold">
            Dashboard
          </h1>
          <div className="whl-flex whl-flex-col whl-gap-4">
            <div className="whl-w-fit">
              <Input
                icon={<SearchIcon size={16} />}
                placeholder="Search tags..."
                className="whl-border-muted-foreground whl-bg-primary"
              />
            </div>
            <div className="whl-flex whl-flex-col whl-gap-1">
              {tags.map((tag, i) => (
                <Toggle
                  key={`${tag}-${i}`}
                  size="xs"
                  className="whl-justify-start"
                >
                  # {tag}
                </Toggle>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagExplore;
