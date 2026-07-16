import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    resolveAlias: {
      "#main-entry-point": path.resolve(
        "./node_modules/.prisma/client/index.js"
      ),
      "#wasm-compiler-loader": path.resolve(
        "./node_modules/.prisma/client/wasm-worker-loader.mjs"
      ),
    },
  },
  // In Next.js 15+, allowedDevOrigins is root-level
  allowedDevOrigins: [
    "good-dragons-shop.loca.lt",
    "*.loca.lt",
  ],
};

export default nextConfig;