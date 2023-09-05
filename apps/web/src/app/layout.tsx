import type { Metadata } from "next";

import "~/styles/globals.css";

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
      <body>{children}</body>
    </html>
  );
}
