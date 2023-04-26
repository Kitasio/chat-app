/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    apiEndpoint: process.env.API_ENDPOINT || "http://localhost:5521",
  },
}

module.exports = nextConfig
