/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  resolve: {
    fallback: {
      fs: false,
    },
  },
  experimental: {
    optimizePackageImports: ["react-icons", "next-auth", "prisma"],
  },
};

export default config;
