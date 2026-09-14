import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.silutespmc.lt",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
