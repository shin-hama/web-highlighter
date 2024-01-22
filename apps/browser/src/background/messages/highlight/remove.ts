import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { SpecifiedHighlightRouteParam } from "@whl/common-types";

import type { CommonMessageResponse } from "~/contents/types/background";
import { APP_HOST } from "~/lib/config";

type RemoveHighlightRequest = SpecifiedHighlightRouteParam;

const handler: PlasmoMessaging.MessageHandler<
  RemoveHighlightRequest,
  CommonMessageResponse
> = async (req, res) => {
  if (!req.body) {
    console.warn("No body found in request");
    return;
  }

  const { id } = req.body;

  const result = await fetch(`${APP_HOST}/api/highlights/${id}`, {
    method: "DELETE",
  });

  if (result.status >= 400) {
    console.error(await result.json());
  }

  res.send({
    ok: result.ok,
    status: result.status,
    message: result.ok ? "Successfully removed" : "Failed to remove",
  });
};

export default handler;
