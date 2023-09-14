"use client";

import { useState } from "react";

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
      <Card onClick={() => setOpen((prev) => !prev)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{url}</CardDescription>
          <CardDescription>{highlights.length} highlights</CardDescription>
        </CardHeader>
      </Card>
      {open && <Highlights highlights={highlights} />}
    </>
  );
};

export default PageCard;
