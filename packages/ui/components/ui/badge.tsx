import * as React from "react";
import { cn } from "@ui/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "whl-inline-flex whl-items-center whl-rounded-full whl-border whl-px-2.5 whl-py-0.5 whl-text-xs whl-font-semibold whl-transition-colors focus:whl-outline-none focus:whl-ring-2 focus:ring-ring focus:whl-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "whl-border-transparent whl-bg-primary whl-text-primary-foreground hover:whl-bg-primary/80",
        secondary:
          "whl-border-transparent whl-bg-secondary whl-text-secondary-foreground hover:whl-bg-secondary/80",
        destructive:
          "whl-border-transparent whl-bg-destructive whl-text-destructive-foreground hover:whl-bg-destructive/80",
        outline: "whl-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
