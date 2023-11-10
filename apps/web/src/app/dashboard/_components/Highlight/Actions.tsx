"use client";

import { Trash2 } from "lucide-react";
import { useSWRConfig } from "swr";

import { Button } from "@whl/ui/components/ui/button";

interface Props {
  id: string;
  pageId: string;
}
export const Actions = ({ id, pageId }: Props) => {
  const { mutate } = useSWRConfig();
  const handleRemove = async () => {
    await fetch(`/api/highlights/${id}`, {
      method: "DELETE",
    });

    void mutate(`/api/highlights?pageId=${pageId}`);
  };

  return (
    <Button size="icon_sm" variant="ghost" onClick={handleRemove}>
      <Trash2 size="20" />
    </Button>
  );
};
