import type { FC, PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@whl/auth";

const Auth: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerAuthSession();
  console.log(session);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return <>{children}</>;
};

export default Auth;
