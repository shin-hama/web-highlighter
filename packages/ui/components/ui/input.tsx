import * as React from "react";
import { cn } from "@ui/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "whl-flex whl-h-10 whl-items-center whl-rounded-md whl-border whl-border-input whl-bg-background whl-text-sm whl-ring-offset-background",
          className,
        )}
      >
        {icon && (
          <div className="whl-pl-3 whl-text-muted-foreground">{icon}</div>
        )}
        <input
          type={type}
          ref={ref}
          {...props}
          className="whl-w-full whl-bg-transparent whl-px-3 whl-py-2 whl-font-sans file:whl-border-0 file:whl-text-sm file:whl-font-medium placeholder:whl-text-muted-foreground focus-visible:whl-outline-none disabled:whl-cursor-not-allowed disabled:whl-opacity-50 "
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
