import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http", // ← এটা add করুন
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
