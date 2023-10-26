import type { Metadata } from "next";

import TagExplore from "./_components/Sidebar/TagExplore";

export const metadata: Metadata = {
  title: "Highlighter Dashboard",
  description: "Welcome!!",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="whl-flex whl-h-full whl-flex-row">
      <TagExplore />
      {children}
    </div>
  );
}
