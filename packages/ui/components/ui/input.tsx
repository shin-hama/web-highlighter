import * as React from "react";
import { cn } from "@ui/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "whl-flex whl-h-10 whl-w-full whl-rounded-md whl-border whl-border-input whl-bg-background whl-px-3 whl-py-2 whl-font-sans whl-text-sm whl-ring-offset-background file:whl-border-0 file:whl-bg-transparent file:whl-text-sm file:whl-font-medium placeholder:whl-text-muted-foreground focus-visible:whl-outline-none focus-visible:whl-ring-2 focus-visible:whl-ring-ring focus-visible:whl-ring-offset-2 disabled:whl-cursor-not-allowed disabled:whl-opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
