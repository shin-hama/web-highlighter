import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

import type { Page } from "@whl/db";
import { Button } from "@whl/ui/components/ui/button";

const QuoteSource = ({ title, url }: Page) => {
  return (
    <div className="whl-relative whl-bg-gray-100 whl-px-2 whl-py-1">
      <div className="whl-flex whl-w-full whl-flex-row whl-items-center whl-space-x-4">
        <Image
          src={`https://www.google.com/s2/favicons?sz=64&domain=${
            new URL(url).hostname
          }`}
          alt={`Favicon for ${title}`}
          width={32}
          height={32}
          className="whl-flex-shrink-0"
        />
        <div className="whl-flex whl-w-full whl-flex-1 whl-flex-col whl-overflow-hidden">
          <span className="whl-truncate">{title}</span>
          <span className="whl-truncate whl-text-xs whl-font-light">
            {new URL(url).hostname}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon_xs"
        className="whl-absolute whl-right-1 whl-top-1 hover:whl-bg-gray-200"
        color="primary"
        asChild
      >
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLinkIcon size={12} />
        </Link>
      </Button>
    </div>
  );
};

export default QuoteSource;
