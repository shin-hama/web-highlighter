"use client";

import { ExternalLink, Trash2 } from "lucide-react";
import { useSWRConfig } from "swr";

import { Button } from "@whl/ui/components/ui/button";

interface Props {
  id: string;
  pageId: string;
  url: string;
}
export const Actions = ({ id, pageId, url }: Props) => {
  const { mutate } = useSWRConfig();
  const handleRemove = async () => {
    await fetch(`/api/highlights/${id}`, {
      method: "DELETE",
    });

    void mutate(`/api/highlights?pageId=${pageId}`);
  };

  return (
    <div className="whl-flex whl-border-spacing-2 whl-flex-row">
      {url && (
        <Button
          variant="ghost"
          size="icon_sm"
          onClick={() => {
            window.open(url, "_blank");
          }}
        >
          <ExternalLink />
        </Button>
      )}
      <Button size="icon_sm" variant="ghost" onClick={handleRemove}>
        <Trash2 size="20" />
      </Button>
    </div>
  );
};
