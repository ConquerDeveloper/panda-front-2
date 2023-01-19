/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['aqueous-forest-78024.herokuapp.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
