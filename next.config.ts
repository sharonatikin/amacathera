import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/images/**",
      },
      {
        protocol: "https",
        hostname: "amacathera.com",
        pathname: "/api/images/**",
      },
    ],
  },
};

export default nextConfig;