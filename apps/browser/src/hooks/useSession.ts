import { useMemo, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce } from "react-use";

import type { Session } from "@whl/db";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    setLoading(true);
    sendToBackground<undefined, Session | null>({
      name: "session",
    })
      .then((response) => {
        console.log(response);
        setSession(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const value = useMemo(
    () => ({
      session,
      status: loading
        ? "loading"
        : session
        ? "authenticated"
        : "unauthenticated",
    }),
    [loading, session],
  );

  return value;
};
