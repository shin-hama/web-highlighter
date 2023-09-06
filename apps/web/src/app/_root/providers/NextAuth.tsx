"use client";

import type { FC, PropsWithChildren } from "react";

import { SessionProvider } from "@whl/auth/react";

const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
