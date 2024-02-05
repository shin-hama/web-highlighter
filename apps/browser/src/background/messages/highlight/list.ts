import type { PlasmoMessaging } from "@plasmohq/messaging";

import type {
  GetHighlightsResponse,
  HighlightWithLabelAndPageAndTag,
} from "@whl/common-types";

import { APP_HOST } from "~/lib/config";

const handler: PlasmoMessaging.MessageHandler<
  undefined,
  HighlightWithLabelAndPageAndTag[]
> = async (req, res) => {
  const result = await fetch(`${APP_HOST}/api/highlights`, {
    method: "GET",
  });

  const { highlights } = (await result.json()) as GetHighlightsResponse;
  res.send(highlights);
};

export default handler;
