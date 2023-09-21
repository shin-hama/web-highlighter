import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Highlighter Dashboard",
  description: "Welcome!!",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return <>{children}</>;
}
