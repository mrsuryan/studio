
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for smaller deployments
  output: 'standalone',
  // Ensure SWC minification is explicitly enabled (default in newer Next.js)
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
