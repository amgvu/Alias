import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.discordapp.com"],
  },
  transpilePackages: ["framer-motion"],
};

export default nextConfig;
