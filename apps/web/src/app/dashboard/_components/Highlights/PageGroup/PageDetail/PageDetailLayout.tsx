import Link from "next/link";
import dayjs from "dayjs";

import type { Page } from "@whl/db";

import EditableHighlights from "./EditableHighlights";

type Props = Page;
const PageDetailLayout = ({ id, title, url, updatedAt }: Props) => {
  return (
    <div className="whl-space-y-6 whl-p-4">
      <div className="whl-flex whl-flex-col whl-gap-0.5">
        <h2 className="whl-text-2xl whl-font-bold">{title}</h2>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="whl-text-sm whl-text-blue-600 visited:whl-text-purple-600 hover:whl-text-blue-800 hover:whl-underline"
        >
          {url}
        </Link>
        <span className="whl-text-sm">
          Updated at: {dayjs(updatedAt).format("YYYY-MM-DD")}
        </span>
      </div>
      <EditableHighlights pageId={id} />
    </div>
  );
};

export default PageDetailLayout;
