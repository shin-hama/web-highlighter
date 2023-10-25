import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { CreateHighlightRequest } from "@whl/common-types";
import type { Highlight } from "@whl/db";

import { APP_HOST } from "~/lib/config";

const handler: PlasmoMessaging.MessageHandler<
  CreateHighlightRequest,
  Highlight
> = async (req, res) => {
  if (!req.body) {
    console.warn("No body found in request");
    return;
  }

  const { page, highlight, tag } = req.body;

  const result = await fetch(`${APP_HOST}/api/highlights`, {
    method: "POST",
    body: JSON.stringify({
      page,
      highlight,
      tag,
    }),
  });

  if (result.status >= 400) {
    console.error(await result.json());
    return;
  }
  res.send((await result.json()) as Highlight);
};

export default handler;
