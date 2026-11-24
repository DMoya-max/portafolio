import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/base-path";

// GitHub Pages sirve los proyectos bajo /<nombre-del-repositorio>.
// Cambia NEXT_PUBLIC_BASE_PATH si el repositorio se renombra (por ejemplo, /Portafolio-Moya).
const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : undefined,
};

export default nextConfig;
