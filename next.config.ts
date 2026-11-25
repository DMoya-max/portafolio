import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  devIndicators: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/portafolio",
  assetPrefix: "/portafolio/",
};

export default nextConfig;
