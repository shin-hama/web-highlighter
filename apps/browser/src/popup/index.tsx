import { useState } from "react";

import "@whl/ui/app/globals.css";

import { sendToBackground } from "@plasmohq/messaging";
import { useEffectOnce } from "react-use";

import type { Session } from "@whl/auth";
import { Button } from "@whl/ui/components/ui/Button";

function IndexPopup() {
  const [session, setSession] = useState<Session | undefined | null>(undefined);

  useEffectOnce(() => {
    sendToBackground<undefined, Session>({
      name: "session",
    })
      .then((response) => {
        console.log(response);
        setSession(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  if (session === undefined) {
    return <></>;
  }

  return (
    <div className="whl-flex whl-h-64 whl-w-80 whl-items-center whl-justify-center">
      {session ? (
        <div>latest highlights</div>
      ) : (
        <div className="whl-flex whl-flex-col whl-items-center whl-space-y-8 whl-px-12">
          <p>
            If record the highlight, you need sign in or create new account.
          </p>
          <div>
            <Button asChild>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://localhost:3000/api/auth/signin"
              >
                Sign in
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndexPopup;
