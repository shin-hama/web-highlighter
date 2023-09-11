import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import Auth from "./_root/Auth";
import NextAuthProvider from "./_root/providers/NextAuth";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome!!",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <NextAuthProvider>
          <Auth>{children}</Auth>
        </NextAuthProvider>
      </body>
    </html>
  );
}
