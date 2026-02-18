import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["cdn-icons-png.flaticon.com"],
  },
};

export default nextConfig;
