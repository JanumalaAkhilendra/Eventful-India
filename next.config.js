/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com']
  },
  // Enable static export for Vercel deployment
  trailingSlash: true,
  // Optimize for production
  swcMinify: true,
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;