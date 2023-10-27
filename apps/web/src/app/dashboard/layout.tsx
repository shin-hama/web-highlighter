import type { Metadata } from "next";

import DashboardSidebar from "./_components/Sidebar/DashboardSidebar";

export const metadata: Metadata = {
  title: "Highlighter Dashboard",
  description: "Welcome!!",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="whl-flex whl-h-full whl-flex-row">
      <DashboardSidebar />
      {children}
    </div>
  );
}
