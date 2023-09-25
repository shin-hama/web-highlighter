import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { HighlightWithLabelAndPage } from "@whl/common-types";

const handler: PlasmoMessaging.MessageHandler<
  undefined,
  HighlightWithLabelAndPage[]
> = async (req, res) => {
  const result = await fetch(`http://localhost:3000/api/highlights`, {
    method: "GET",
  });

  res.send((await result.json()) as HighlightWithLabelAndPage[]);
};

export default handler;
