/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    apiEndpoint: process.env.API_ENDPOINT || "http://localhost:8000",
  },
}

module.exports = nextConfig
