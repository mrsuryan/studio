/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/seed/**', // Allows images from /seed/...
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // Fallback for other picsum paths if needed, more specific is better
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
     // You can also use the older `domains` property if needed, but remotePatterns is preferred
     // domains: ['picsum.photos'],
  },
};

module.exports = nextConfig;
