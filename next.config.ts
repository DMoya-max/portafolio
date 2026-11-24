import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
