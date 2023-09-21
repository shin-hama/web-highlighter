import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { CreateHighlightRequest } from "@whl/common-types";
import type { Highlight } from "@whl/db";

const handler: PlasmoMessaging.MessageHandler<
  CreateHighlightRequest,
  Highlight
> = async (req, res) => {
  if (!req.body) {
    console.warn("No body found in request");
    return;
  }

  const { page, highlight } = req.body;

  const result = await fetch(`http://localhost:3000/api/highlights`, {
    method: "POST",
    body: JSON.stringify({
      page,
      highlight,
    }),
  });

  res.send((await result.json()) as Highlight);
};

export default handler;
