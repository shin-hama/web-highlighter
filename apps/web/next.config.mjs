/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'


/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@whl/auth", "@whl/db", "@whl/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
  },

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
