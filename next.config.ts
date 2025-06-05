/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/aurauskulmat/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/aurauskulmat' : '',
};

export default nextConfig;