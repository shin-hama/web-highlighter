import type { PlasmoMessaging } from "@plasmohq/messaging";

import { APP_HOST } from "~/lib/config";

const handler: PlasmoMessaging.MessageHandler<undefined, boolean> = async (
  _,
  res,
) => {
  const hasSession = await new Promise<boolean>((resolve) => {
    chrome.cookies.getAll(
      {
        url: APP_HOST,
      },
      (cookies) => {
        const hasSession = cookies.some((cookie) =>
          cookie.name.endsWith("next-auth.session-token"),
        );

        resolve(hasSession);
      },
    );
  }).catch(() => false);

  res.send(hasSession);
};

export default handler;
