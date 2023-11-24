import type { PlasmoMessaging } from "@plasmohq/messaging";

import { PageIdFromURL } from "@whl/common-types";
import type { GetHighlightsOnAPageResponse } from "@whl/common-types";

import { APP_HOST } from "~/lib/config";

export interface RequestHighlightsOnAPageParams {
  url: string;
}
const handler: PlasmoMessaging.MessageHandler<
  RequestHighlightsOnAPageParams,
  GetHighlightsOnAPageResponse
> = async (req, res) => {
  if (!req.body) {
    return;
  }
  const { url } = req.body;
  const result = await fetch(
    `${APP_HOST}/api/pages/${PageIdFromURL.parse(url)}/highlights`,
    {
      method: "GET",
    },
  );

  res.send((await result.json()) as GetHighlightsOnAPageResponse);
};

export default handler;
