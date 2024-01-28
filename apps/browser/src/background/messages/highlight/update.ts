import type { PlasmoMessaging } from "@plasmohq/messaging";

import type {
  HighlightWithLabelAndPositionAndTag,
  SpecifiedHighlightRouteParam,
  UpdateHighlightRequest,
} from "@whl/common-types";

import type { CommonMessageResponse } from "~/contents/types/background";
import { APP_HOST } from "~/lib/config";

export type UpdateHighlightMessageRequest = UpdateHighlightRequest &
  SpecifiedHighlightRouteParam;
export type UpdateHighlightResponse =
  CommonMessageResponse<HighlightWithLabelAndPositionAndTag>;

const handler: PlasmoMessaging.MessageHandler<
  UpdateHighlightMessageRequest,
  UpdateHighlightResponse
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

  const { id, ...body } = req.body;

  const result = await fetch(`${APP_HOST}/api/highlights/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (result.status >= 400) {
    console.error(await result.json());
    res.send({
      message: "Failed to update highlight",
      status: result.status,
      ok: false,
    });
    return;
  }
  res.send({
    message: "Successfully updated highlight",
    status: result.status,
    ok: true,
    data: (await result.json()) as HighlightWithLabelAndPositionAndTag,
  });
};

export default handler;
