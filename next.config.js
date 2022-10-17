/** @type {import('next').NextConfig} */

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
    domains: ["gateway.ipfscdn.io"],
  },
});

module.exports = nextConfig;
