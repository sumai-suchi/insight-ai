// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "i.ibb.co",
//       },
//       {
//         protocol: "https",
//         hostname: "cdn-icons-png.flaticon.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

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
