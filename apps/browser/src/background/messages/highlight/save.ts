import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { Highlight } from "@whl/db";

export interface SaveHighlightRequest {
  url: string;
  title: string;
  highlight: {
    content: string;
    color: string;
  };
}

const handler: PlasmoMessaging.MessageHandler<
  SaveHighlightRequest,
  Highlight
> = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    console.warn("No body found in request");
    return;
  }

  const { url, title, highlight } = req.body;

  const result = await fetch(`http://localhost:3000/api/highlights`, {
    method: "POST",
    body: JSON.stringify({
      page: {
        url,
        title,
      },
      highlight,
    }),
  });

  res.send((await result.json()) as Highlight);
};

export default handler;
