import baseConfig from "@whl/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [baseConfig],
  content: [
    "./src/**/*.{tsx,html}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
