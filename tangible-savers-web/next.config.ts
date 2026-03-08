import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: "./",
  },
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
