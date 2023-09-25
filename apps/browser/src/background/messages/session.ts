import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { Session } from "@whl/auth";

const handler: PlasmoMessaging.MessageHandler<
  undefined,
  Session | null
> = async (_, res) => {
  const result = await fetch(`http://localhost:3000/api/auth/session`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json && typeof json === "object" && "user" in json) {
        return json as Session;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });

  res.send(result);
};

export default handler;
