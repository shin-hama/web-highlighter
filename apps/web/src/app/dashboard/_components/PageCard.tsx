"use client";

import { useState } from "react";
import Image from "next/image";

import type { Highlight, Page } from "@whl/db";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@whl/ui/components/ui/card";

import Highlights from "./Highlights";

interface Props extends Page {
  highlights: Highlight[];
}
const PageCard = ({ title, url, highlights }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen((prev) => !prev)}
        className="whl-rounded-none"
      >
        <CardHeader className="whl-p-2">
          <div className="whl-flex whl-flex-row whl-items-center whl-space-x-1">
            <Image
              // src に props.url のドメイン + favicon.ico がある場所を指定する
              src={`https://www.google.com/s2/favicons?sz=64&domain=${
                new URL(url).hostname
              }`}
              alt={`Favicon for ${title}`}
              width={32}
              height={32}
            />
            <div>
              <CardTitle className="whl-text-lg">{title}</CardTitle>
              <div className="whl-flex whl-flex-row whl-space-x-1">
                <CardDescription>
                  {highlights.length} highlights
                </CardDescription>
                <CardDescription>|</CardDescription>
                <CardDescription>{new URL(url).hostname}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      {open && <Highlights highlights={highlights} />}
    </>
  );
};

export default PageCard;
