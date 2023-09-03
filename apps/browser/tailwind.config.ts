import type { Config } from "tailwindcss";
import baseConfig from "ui/tailwind.config";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [baseConfig],
  mode: "jit",
} satisfies Config;
