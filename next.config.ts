import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dataset.uz',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
