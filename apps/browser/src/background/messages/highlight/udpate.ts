import type { PlasmoMessaging } from "@plasmohq/messaging";

import type {
  CreateHighlightOnTagRequest,
  SpecifiedHighlightRouteParam,
} from "@whl/common-types";
import type { Highlight } from "@whl/db";

import { APP_HOST } from "~/lib/config";

type UpdateHighlightRequest = CreateHighlightOnTagRequest &
  SpecifiedHighlightRouteParam;

const handler: PlasmoMessaging.MessageHandler<
  UpdateHighlightRequest,
  Highlight
> = async (req, res) => {
  if (!req.body) {
    console.warn("No body found in request");
    return;
  }

  const { id, tag } = req.body;

  const result = await fetch(`${APP_HOST}/api/highlights/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      tag,
    }),
  });

  if (result.status >= 400) {
    console.error(await result.json());
    return;
  }
  res.send((await result.json()) as Highlight);
};

export default handler;
