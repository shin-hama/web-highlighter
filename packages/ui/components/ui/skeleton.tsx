import { cn } from "@ui/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("whl-animate-pulse whl-rounded-md whl-bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
