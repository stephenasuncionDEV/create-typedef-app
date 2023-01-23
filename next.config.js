/** @type {import('next').NextConfig} */

/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  swcMinify: true,
  env: {
    APP_NAME: process.env.APP_NAME,
    MAIN_HOST: process.env.MAIN_HOST,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    POSTHOG_TOKEN: process.env.POSTHOG_TOKEN,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    ETHEREUM_ADDRESS: process.env.ETHEREUM_ADDRESS,
    SOLANA_ADDRESS: process.env.SOLANA_ADDRESS,
    CHAIN_ID: process.env.CHAIN_ID,
    SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about/terms",
        permanent: false,
      },
    ];
  },
});

module.exports = nextConfig;
