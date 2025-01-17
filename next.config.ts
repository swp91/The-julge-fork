import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'bootcamp-project-api.s3.ap-northeast-2.amazonaws.com',
      'images.unsplash.com',
    ],
  },
};

export default nextConfig;
