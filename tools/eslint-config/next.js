/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:@next/next/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "error",
  },
  ignorePatterns: [".next"],
};

module.exports = config;
