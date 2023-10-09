import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { HighlightWithLabelAndPage } from "@whl/common-types";

import { API_HOST } from "~/lib/config";

const handler: PlasmoMessaging.MessageHandler<
  undefined,
  HighlightWithLabelAndPage[]
> = async (req, res) => {
  const result = await fetch(`${API_HOST}/api/highlights`, {
    method: "GET",
  });

  res.send((await result.json()) as HighlightWithLabelAndPage[]);
};

export default handler;
