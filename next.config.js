/** @type {import('next').NextConfig} */

/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  swcMinify: true,
  env: {
    TEST: process.env.TEST,
  },
  images: {
    domains: [""],
  },
  experimental: {
    appDir: true,
  },
});

module.exports = nextConfig;
