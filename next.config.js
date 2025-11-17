const path = require('path')

/** @type {import('next').NextConfig} */
const storageHosts = ['tarfakademi.com', 'www.tarfakademi.com', 'panel.tarfakademi.com']

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      ...storageHosts.flatMap((hostname) => ([
        {
          protocol: 'https',
          hostname,
          pathname: '/storage/**',
        },
        {
          protocol: 'http',
          hostname,
          pathname: '/storage/**',
        },
      ])),
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
