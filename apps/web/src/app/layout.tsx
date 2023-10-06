import type { Metadata } from "next";

import { fontMono, fontSans } from "~/lib/core/fonts";

import "@whl/ui/app/globals.css";

import { cn } from "@whl/ui/lib/utils";

import Header from "./_layout/Header";
import Sidebar from "./_layout/Sidebar";
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
          <Auth>
            <div className="whl-relative whl-flex whl-h-screen whl-flex-row">
              <nav className="whl-h-full">
                <Sidebar />
              </nav>
              <div className="whl-flex whl-h-full whl-flex-grow whl-flex-col whl-overflow-hidden">
                <header>
                  <Header />
                </header>
                <div className="whl-h-full whl-flex-1 whl-overflow-hidden">
                  {children}
                </div>
              </div>
            </div>
          </Auth>
        </NextAuthProvider>
      </body>
    </html>
  );
}
