import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "hp-otoyabak-local-ga0du58fv23gas9bueraga.s3.ap-northeast-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "hp-otoyabak-local-ga0du58fv23gas9bueraga.s3.ap-northeast-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
