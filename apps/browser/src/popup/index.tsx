import "@whl/ui/app/globals.css";

import { Button } from "@whl/ui/components/ui/button";

import { useSession } from "~/hooks/useSession";
import Highlights from "./components/Highlights";

function IndexPopup() {
  const { status } = useSession();

  if (status === "loading") {
    return <>loading</>;
  }

  return (
    <div className="whl-flex whl-h-64 whl-w-80 whl-items-center whl-justify-center">
      {status === "authenticated" ? (
        <>
          <div>latest highlights</div>
          <Highlights />
        </>
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
