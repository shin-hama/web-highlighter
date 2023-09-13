import type { PlasmoMessaging } from "@plasmohq/messaging";

export interface SaveHighlightRequest {
  url: string;
  title: string;
  highlight: {
    content: string;
    color: string;
  };
}

const handler: PlasmoMessaging.MessageHandler<SaveHighlightRequest> = async (
  req,
  res,
) => {
  console.log(req.body);
  if (!req.body) {
    console.warn("No body found in request");
    return;
  }

  const { url, title, highlight } = req.body;

  const result = await fetch(`http://localhost:3000/api/highlights`, {
    method: "POST",
  });

  res.send({});
};

export default handler;
