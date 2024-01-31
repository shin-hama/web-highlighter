import * as React from "react";
import { cn } from "@ui/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "whl-flex whl-min-h-[80px] whl-w-full whl-rounded-md whl-border whl-border-input whl-bg-background whl-px-3 whl-py-2 whl-text-sm placeholder:whl-text-muted-foreground focus-visible:whl-outline-none disabled:whl-cursor-not-allowed disabled:whl-opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
