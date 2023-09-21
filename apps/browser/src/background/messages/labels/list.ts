import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { Label } from "@whl/db";

const handler: PlasmoMessaging.MessageHandler<undefined, Label[]> = async (
  req,
  res,
) => {
  const result = await fetch(`http://localhost:3000/api/labels`, {
    method: "GET",
  });

  res.send((await result.json()) as Label[]);
};

export default handler;
