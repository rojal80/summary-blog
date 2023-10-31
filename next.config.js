/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      serverActions: true,
      isrMemoryCacheSize: 50,
   },
};

module.exports = nextConfig;
