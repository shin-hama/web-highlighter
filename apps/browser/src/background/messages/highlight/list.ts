import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { HighlightWithLabelAndPage } from "@whl/common-types";

import { APP_HOST } from "~/lib/config";

const handler: PlasmoMessaging.MessageHandler<
  undefined,
  HighlightWithLabelAndPage[]
> = async (req, res) => {
  const result = await fetch(`${APP_HOST}/api/highlights`, {
    method: "GET",
  });

  res.send((await result.json()) as HighlightWithLabelAndPage[]);
};

export default handler;
