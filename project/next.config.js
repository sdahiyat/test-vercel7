/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['libsodium-wrappers']
  }
}

module.exports = nextConfig
