import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV, // Expose NODE_ENV to client
  },
};

export default nextConfig;
