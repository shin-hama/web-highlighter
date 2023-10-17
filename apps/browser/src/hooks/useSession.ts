import { useMemo, useState } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce } from "react-use";

export const useSession = () => {
  const [authenticated, setAuthenticated] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    setLoading(true);
    sendToBackground<undefined, boolean>({
      name: "session",
    })
      .then((response) => {
        setAuthenticated(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const value = useMemo<{
    status: "loading" | "authenticated" | "unauthenticated";
  }>(
    () => ({
      status:
        loading || authenticated === undefined
          ? "loading"
          : authenticated
          ? "authenticated"
          : "unauthenticated",
    }),
    [loading, authenticated],
  );

  return value;
};
