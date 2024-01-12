import type { PropsWithChildren } from "react";

import NextAuthProvider from "./providers/NextAuth";
import { SWRConfigProvider } from "./providers/SWRConfigProvider";

export const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextAuthProvider>
      <SWRConfigProvider>{children}</SWRConfigProvider>
    </NextAuthProvider>
  );
};
