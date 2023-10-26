import baseConfig from "@whl/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...baseConfig.theme.extend.fontFamily.sans],
      },
    },
  },
  content: [
    "./src/**/*.{tsx,html}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
