import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash:true,
  // basePath:'/asas-basiq360-2',
  // assetPrefix:'/asas-basiq360-2',
  images:{
    unoptimized: true
  }
};

export default nextConfig;
