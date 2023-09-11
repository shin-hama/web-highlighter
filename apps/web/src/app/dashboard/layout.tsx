import type { Metadata } from "next";

import Header from "./_layout/Header";

export const metadata: Metadata = {
  title: "Highlighter Dashboard",
  description: "Welcome!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>
      {children}
    </>
  );
}
