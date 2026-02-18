import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    domains: ["i.ibb.co"], // ⚠️ .co.com না, শুধু i.ibb.co
  },
};

export default nextConfig;
