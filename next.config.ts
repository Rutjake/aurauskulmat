import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: 'export',
    images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/github.com/Rutjake/aurauskulmat/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/github.com/Rutjake/aurauskulmat' : '',
};

export default nextConfig;
