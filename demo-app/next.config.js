/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
    enableUndici: true,
  },
};

module.exports = nextConfig;
