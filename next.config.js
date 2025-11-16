const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'tarfakademi.com',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias['framer-motion'] = path.resolve(__dirname, 'lib/framer-motion-stub.tsx')
    return config
  },
}

module.exports = nextConfig
