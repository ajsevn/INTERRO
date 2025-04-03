import { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // This line causes the error
  } as any,
};

export default nextConfig;
