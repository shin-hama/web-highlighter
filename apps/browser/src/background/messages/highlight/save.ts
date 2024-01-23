import type { PlasmoMessaging } from "@plasmohq/messaging";

import type {
  CreateHighlightRequest,
  HighlightWithLabelAndPositionAndTag,
} from "@whl/common-types";

import type { CommonMessageResponse } from "~/contents/types/background";
import { APP_HOST } from "~/lib/config";

export type SaveHighlightResponse =
  CommonMessageResponse<HighlightWithLabelAndPositionAndTag>;
const handler: PlasmoMessaging.MessageHandler<
  CreateHighlightRequest,
  SaveHighlightResponse
> = async (req, res) => {
  if (!req.body) {
    console.warn("No body found in request");
    res.send({
      message: "No body found in request",
      status: 400,
      ok: false,
    });
    return;
  }

  const { page, highlight, tags } = req.body;

  const result = await fetch(`${APP_HOST}/api/highlights`, {
    method: "POST",
    body: JSON.stringify({
      page,
      highlight,
      tags,
    }),
  });

  if (result.status >= 400) {
    console.error(await result.json());
    res.send({
      message: "Failed to save highlight",
      status: result.status,
      ok: false,
    });
    return;
  }
  res.send({
    message: "Successfully saved highlight",
    status: result.status,
    ok: true,
    data: (await result.json()) as HighlightWithLabelAndPositionAndTag,
  });
};

export default handler;
