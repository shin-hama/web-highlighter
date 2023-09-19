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
        <div className="whl-flex-grow">
          <header>
            <Header />
          </header>
          {children}
        </div>
      </div>
    </>
  );
}
