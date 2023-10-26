import { Input } from "@whl/ui/components/ui/input";

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
    <div className="whl-h-full whl-w-48 whl-bg-primary whl-pb-4 whl-pt-2 whl-text-primary-foreground">
      <div className="whl-h-full">
        <div className="whl-flex whl-h-full whl-flex-col whl-items-center whl-space-y-6">
          <h1 className="whl-px-4 whl-font-mono whl-text-2xl whl-font-bold">
            Dashboard
          </h1>
          <div className="whl-gap-4">
            <div className="whl-w-fit whl-px-2">
              <Input placeholder="Search Tags" />
            </div>
            {tags.map((tag, i) => (
              <p key={`${tag}-${i}`}># {tag}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagExplore;
