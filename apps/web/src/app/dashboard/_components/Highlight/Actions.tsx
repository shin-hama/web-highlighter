"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@whl/ui/components/ui/Button";

export const Actions = () => {
  return (
    <Button size="icon_sm" variant="ghost">
      <Trash2 size="20" />
    </Button>
  );
};
