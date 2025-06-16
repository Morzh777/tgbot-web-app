/** @type {import('next').NextConfig} */
const nextConfig = {
  // Настройки для GitHub Pages
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/tgbot-web-app' : '',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig; 