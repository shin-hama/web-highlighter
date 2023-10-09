"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@whl/ui/components/ui/button";

interface Props {
  id: string;
}
export const Actions = ({ id }: Props) => {
  const handleRemove = async () => {
    console.log(`Removing highlight ${id}`);
    await fetch(`/api/highlights/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <Button size="icon_sm" variant="ghost" onClick={handleRemove}>
      <Trash2 size="20" />
    </Button>
  );
};
