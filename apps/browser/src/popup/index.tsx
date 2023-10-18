import "@whl/ui/app/globals.css";

import { Button } from "@whl/ui/components/ui/button";

import { useSession } from "~/hooks/useSession";
import { APP_HOST } from "~/lib/config";
import Header from "./components/Header";
import Highlights from "./components/Highlights";

function IndexPopup() {
  const { status } = useSession();

  if (status === "loading") {
    return <>loading</>;
  }

  return (
    <div className="whl-w-96">
      <Header />
      {status === "authenticated" ? (
        <div className="whl-flex whl-w-full whl-flex-col whl-gap-2 whl-pt-2">
          <div className="whl-px-4">
            <div className="whl-font-bold">Quick Feeds</div>
          </div>
          <Highlights />
          <Button asChild className="whl-w-full whl-rounded-none">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${APP_HOST}/dashboard`}
            >
              Show More
            </a>
          </Button>
        </div>
      ) : (
        <div className="whl-flex whl-flex-col whl-items-center whl-justify-center">
          <div className="whl-flex whl-flex-col whl-items-center whl-space-y-8 whl-px-12 whl-py-16">
            <p>
              If record the highlight, you need sign in or create new account.
            </p>
            <div>
              <Button asChild className="whl-rounded-none">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${APP_HOST}/api/auth/signin`}
                >
                  Sign in
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndexPopup;
