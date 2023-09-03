import baseConfig from "ui/tailwind.config"

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [baseConfig],
  content: ["./src/**/*.{tsx,html}"],
  prefix: "whl-"
}
