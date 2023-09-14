"use client";

import type { PropsWithChildren } from "react";

import { SessionProvider } from "@whl/auth/react";

const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
