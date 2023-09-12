import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const results = await fetch(`http://localhost:3000/api/auth/session`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });

  res.send({
    results,
  });
};

export default handler;
