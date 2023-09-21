import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Welcome!!",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return <>{children}</>;
}
