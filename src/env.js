import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// jsdoc for zodFormat
/**
 * @param {number} min - minimum length of the string
 * @param {number} [max=100] - maximum length of the string
 *
*/
const zodFormat = (min, max = 100) => z.string().trim().min(min).max(max);

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH0_CLIENT_ID: zodFormat(1, 100),
    AUTH0_CLIENT_SECRET: zodFormat(1, 100),
    AUTH0_ISSUER: zodFormat(1, 100),
    AUTH_URL: zodFormat(1, 50).url(),
    DATABASE_URL: zodFormat(1, 400).url(),
    EMAIL_SERVER_HOST: zodFormat(1, 100),
    EMAIL_SERVER_PASSWORD: zodFormat(1, 100),
    EMAIL_SERVER_PORT: zodFormat(1, 5),
    EMAIL_SERVER_USER: zodFormat(1, 100).email("Invalid email"),
    GOOGLE_ID: zodFormat(1, 100),
    GOOGLE_SECRET: zodFormat(1, 100),
    HOST_URL: zodFormat(1, 50).url(),
    // base 64 encoded string
    NEXTAUTH_SECRET: zodFormat(1, 150),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    POSTGRES_DATABASE: zodFormat(1, 50),
    POSTGRES_HOST: zodFormat(1, 100),
    POSTGRES_PASSWORD: zodFormat(1, 50),
    POSTGRES_PRISMA_URL: zodFormat(1, 200),
    POSTGRES_URL: zodFormat(1, 200),
    POSTGRES_URL_NON_POOLING: zodFormat(1, 200),
    POSTGRES_USER: zodFormat(1, 50),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_HOST_URL: zodFormat(1, 50).url(),
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_ISSUER: process.env.AUTH0_ISSUER,
    AUTH_URL: process.env.AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    HOST_URL: process.env.HOST_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL,
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
