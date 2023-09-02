/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["custom/react", "custom/base"],
  env: { browser: true },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};

module.exports = config;
