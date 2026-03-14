import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/', destination: '/commonlayout' },
      { source: '/consultaion/:path*', destination: '/commonlayout/consultaion/:path*' },
      { source: '/diagonistic/:path*', destination: '/commonlayout/diagonistic/:path*' },
      { source: '/health-Plane/:path*', destination: '/commonlayout/health-Plane/:path*' },
      { source: '/medicine/:path*', destination: '/commonlayout/medicine/:path*' },
      { source: '/ngos/:path*', destination: '/commonlayout/ngos/:path*' },
      { source: '/auth/:path*', destination: '/commonlayout/auth/:path*' },
    ];
  },
};

export default nextConfig;
