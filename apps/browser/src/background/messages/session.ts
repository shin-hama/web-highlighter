import type { PlasmoMessaging } from "@plasmohq/messaging";

import { APP_HOST } from "~/lib/config";

const handler: PlasmoMessaging.MessageHandler<undefined, boolean> = async (
  _,
  res,
) => {
  // 開発中は localhost の Cookies が保存されないので、session を直接確認する
  if (process.env.NODE_ENV !== "production") {
    const result = await fetch(`${APP_HOST}/api/auth/session`)
      .then((res) => res.json())
      .then((json) => {
        return json !== undefined && typeof json === "object" && "user" in json;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });

    res.send(result);

    return;
  }

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
