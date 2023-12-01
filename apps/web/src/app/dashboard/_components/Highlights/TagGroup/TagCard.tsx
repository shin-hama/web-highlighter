"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { HashIcon } from "lucide-react";
import useSWR from "swr";

import type { HighlightWithLabelAndPageAndTag } from "@whl/common-types";
import type { Tag } from "@whl/db";

import Highlights from "../Highlights";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Props {
  tag: Tag;
}
const TagCard = ({ tag }: Props) => {
  const [open, setOpen] = useState(false);

  const { data } = useSWR<HighlightWithLabelAndPageAndTag[]>(
    `/api/highlights?tagId=${tag.id}`,
    fetcher,
  );

  return (
    <div className="whl-group/tag whl-w-full whl-overflow-hidden">
      <Card
        onClick={() => setOpen((prev) => !prev)}
        className="whl-w-full whl-overflow-hidden whl-rounded-none"
      >
        <CardHeader className="whl-w-full whl-overflow-hidden whl-p-2">
          <div className="whl-flex whl-w-full whl-flex-row whl-items-center whl-space-x-1 whl-overflow-hidden">
            <div className="whl-flex whl-h-8 whl-w-8 whl-items-center whl-justify-center">
              <HashIcon size={24} />
            </div>
            <div className="whl-flex whl-w-full whl-flex-1 whl-flex-col whl-overflow-hidden">
              <CardTitle className="whl-overflow-hidden whl-truncate whl-text-lg">
                {tag.name}
              </CardTitle>
              <div className="whl-flex whl-flex-row whl-space-x-1">
                <CardDescription>
                  {data?.length ?? "*"} highlights
                </CardDescription>
              </div>
            </div>
            <div className="whl-invisible whl-flex whl-flex-shrink-0 whl-flex-row whl-space-x-2 group-hover/tag:whl-visible"></div>
          </div>
        </CardHeader>
      </Card>
      {data && open && <Highlights highlights={data} />}
    </div>
  );
};

export default TagCard;
