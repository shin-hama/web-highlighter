import type { PlasmoMessaging } from "@plasmohq/messaging";

import type { Session } from "@whl/auth";

const handler: PlasmoMessaging.MessageHandler<undefined, Session> = async (
  _,
  res,
) => {
  const result = await fetch(`http://localhost:3000/api/auth/session`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json as Session;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });

  res.send(result);
};

export default handler;
