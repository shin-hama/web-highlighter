import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  prefix: "whl-",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
