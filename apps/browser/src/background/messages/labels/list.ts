import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { Label } from "@whl/db";

import { APP_HOST } from "~/lib/config";

const handler: PlasmoMessaging.MessageHandler<undefined, Label[]> = async (
  req,
  res,
) => {
  const result = await fetch(`${APP_HOST}/api/labels`, {
    method: "GET",
  });

  res.send((await result.json()) as Label[]);
};

export default handler;
