import type { Metadata } from "next";

import Header from "./_layout/Header";
import Sidebar from "./_layout/Sidebar";

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
      <div className="whl-flex whl-flex-row">
        <nav className="whl-h-screen">
          <Sidebar />
        </nav>
        <div className="whl-h-screen whl-flex-grow whl-overflow-hidden">
          <header>
            <Header />
          </header>
          <div className="whl-h-full">{children}</div>
        </div>
      </div>
    </>
  );
}
