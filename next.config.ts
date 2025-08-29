/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", 
        destination: "https://api.garrettmeldrum.com/:path*" },
    ];
  },
};
module.exports = nextConfig;
