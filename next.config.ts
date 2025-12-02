import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  images: {
    domains: ["imagedelivery.net"],
  },
};

export default nextConfig;
