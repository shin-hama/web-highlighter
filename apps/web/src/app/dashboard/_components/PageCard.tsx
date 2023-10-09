"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import type { PageWithHighlightsWithLabel } from "@whl/common-types";
import { Button } from "@whl/ui/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@whl/ui/components/ui/card";

import Highlights from "./Highlights";

const PageCard = ({ title, url, highlights }: PageWithHighlightsWithLabel) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="whl-group/page whl-w-full whl-overflow-hidden">
      <Card
        onClick={() => setOpen((prev) => !prev)}
        className="whl-w-full whl-overflow-hidden whl-rounded-none"
      >
        <CardHeader className="whl-w-full whl-overflow-hidden whl-p-2">
          <div className="whl-flex whl-w-full whl-flex-row whl-items-center whl-space-x-1 whl-overflow-hidden">
            <Image
              src={`https://www.google.com/s2/favicons?sz=64&domain=${
                new URL(url).hostname
              }`}
              alt={`Favicon for ${title}`}
              width={32}
              height={32}
              className="whl-flex-shrink-0"
            />
            <div className="whl-flex whl-w-full whl-flex-1 whl-flex-col whl-overflow-hidden">
              <CardTitle className="whl-overflow-hidden whl-truncate whl-text-lg">
                {title}
              </CardTitle>
              <div className="whl-flex whl-flex-row whl-space-x-1">
                <CardDescription>
                  {highlights.length} highlights
                </CardDescription>
                <CardDescription>|</CardDescription>
                <CardDescription>{new URL(url).hostname}</CardDescription>
              </div>
            </div>
            <div className="whl-invisible whl-flex whl-flex-shrink-0 whl-flex-row whl-space-x-2 group-hover/page:whl-visible">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  console.log("open link");
                  window.open(url, "_blank");
                }}
              >
                <ExternalLink />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      {open && <Highlights highlights={highlights} />}
    </div>
  );
};

export default PageCard;
