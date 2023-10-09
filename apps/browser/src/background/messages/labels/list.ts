import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { Label } from "@whl/db";

import { API_HOST } from "~/lib/config";

const handler: PlasmoMessaging.MessageHandler<undefined, Label[]> = async (
  req,
  res,
) => {
  const result = await fetch(`${API_HOST}/api/labels`, {
    method: "GET",
  });

  res.send((await result.json()) as Label[]);
};

export default handler;
