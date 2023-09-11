"use client";

import { useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@whl/ui/components/ui/card";

import Highlights from "./Highlights";

const PageCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card onClick={() => setOpen((prev) => !prev)}>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>2 highlights</CardDescription>
        </CardHeader>
      </Card>
      {open && <Highlights />}
    </>
  );
};

export default PageCard;
