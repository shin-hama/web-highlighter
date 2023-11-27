import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { HashIcon } from "lucide-react";

interface Props {
  name: string;
  count: number;
}
const TagCard = ({ name, count }: Props) => {
  return (
    <div className="whl-group/tag whl-w-full whl-overflow-hidden">
      <Card className="whl-w-full whl-overflow-hidden whl-rounded-none">
        <CardHeader className="whl-w-full whl-overflow-hidden whl-p-2">
          <div className="whl-flex whl-w-full whl-flex-row whl-items-center whl-space-x-1 whl-overflow-hidden">
            <div className="whl-flex whl-h-8 whl-w-8 whl-items-center whl-justify-center">
              <HashIcon size={24} />
            </div>
            <div className="whl-flex whl-w-full whl-flex-1 whl-flex-col whl-overflow-hidden">
              <CardTitle className="whl-overflow-hidden whl-truncate whl-text-lg">
                {name}
              </CardTitle>
              <div className="whl-flex whl-flex-row whl-space-x-1">
                <CardDescription>{count} highlights</CardDescription>
              </div>
            </div>
            <div className="whl-invisible whl-flex whl-flex-shrink-0 whl-flex-row whl-space-x-2 group-hover/tag:whl-visible"></div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TagCard;
