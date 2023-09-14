import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@whl/auth";

const Auth = async ({ children }: PropsWithChildren) => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return <>{children}</>;
};

export default Auth;
