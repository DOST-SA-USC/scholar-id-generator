import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yidekopqjezejfpugnzi.supabase.co",
      },
    ],
  },
};

export default nextConfig;