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
        const session = cookies.find((cookie) =>
          cookie.name.endsWith("next-auth.session-token"),
        );

        resolve(session !== null);
      },
    );
  }).catch(() => false);

  res.send(hasSession);
};

export default handler;
