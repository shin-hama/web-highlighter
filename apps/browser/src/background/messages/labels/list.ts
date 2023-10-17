import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

import type { Label } from "@whl/db";

import { APP_HOST } from "~/lib/config";

const LABELS_KEY = "labels";

const handler: PlasmoMessaging.MessageHandler<undefined, Label[]> = async (
  req,
  res,
) => {
  const storage = new Storage({
    area: "local",
  });

  // labels が保存済みであればそれを使う
  // データの更新は、アプリ上で更新したときに拡張機能側で検知する
  let labels = await storage.getItem<Label[]>(LABELS_KEY);
  if (labels) {
    res.send(labels);
    return;
  }

  const result = await fetch(`${APP_HOST}/api/labels`, {
    method: "GET",
  });

  labels = (await result.json()) as Label[];
  await storage.setItem(LABELS_KEY, labels);

  res.send(labels);
};

export default handler;
