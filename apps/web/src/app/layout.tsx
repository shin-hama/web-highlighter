import type { Metadata } from "next";

import { fontMono, fontSans } from "~/lib/core/fonts";

import "@whl/ui/app/globals.css";

import { cn } from "@whl/ui/lib/utils";

import Auth from "./_root/Auth";
import NextAuthProvider from "./_root/providers/NextAuth";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body
        className={cn(
          "whl-font-sans whl-antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <NextAuthProvider>
          <Auth>{children}</Auth>
        </NextAuthProvider>
      </body>
    </html>
  );
}
