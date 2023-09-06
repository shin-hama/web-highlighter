import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

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
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
