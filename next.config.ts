/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yidekopqjezejfpugnzi.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
export default nextConfig;
